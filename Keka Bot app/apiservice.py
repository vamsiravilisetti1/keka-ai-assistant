import os
import fitz
from pinecone import Pinecone
import google.generativeai as genai
from dotenv import load_dotenv

class PolicyService:
    def __init__(self):
        load_dotenv()  # Load environment variables

        self.pinecone_key = os.getenv("PINECONE_API_KEY")
        self.pinecone_host = os.getenv("PINECONE_HOST")
        self.gemini_key = os.getenv("GEMINI_API_KEY")

        if not self.pinecone_key:
            raise ValueError("PINECONE_API_KEY is missing in the environment variables.")
        if not self.pinecone_host:
            raise ValueError("PINECONE_HOST is missing in the environment variables.")
        if not self.gemini_key:
            raise ValueError("GEMINI_API_KEY is missing in the environment variables.")

        # Initialize Pinecone
        self.pc = Pinecone(api_key=self.pinecone_key)
        self.index = self.pc.Index(host=self.pinecone_host)

        # Initialize Gemini
        genai.configure(api_key=self.gemini_key)

    def extract_text_from_pdf(self, file):
        doc = fitz.open(stream=file.read(), filetype="pdf")  # Read PDF directly from file object
        text = "\n".join([page.get_text() for page in doc])
        return text

    def chunk_text(self, text, max_bytes=10000):
        """Splits text into chunks that fit within the byte limit."""
        chunks = []
        current_chunk = ""

        for line in text.split("\n"):
            if len((current_chunk + line).encode("utf-8")) > max_bytes:
                chunks.append(current_chunk)
                current_chunk = line
            else:
                current_chunk += "\n" + line

        if current_chunk:
            chunks.append(current_chunk)
        return chunks

    def get_embedding(self, text):
        chunks = self.chunk_text(text)
        embeddings = []

        for chunk in chunks:
            response = genai.embed_content(
                model="models/embedding-001",
                content=chunk,
                task_type="retrieval_document"
            )
            embeddings.append(response["embedding"])

        flat_list = [item for sublist in embeddings for item in sublist]
        return flat_list

    def store_policy_embedding(self, text, doc_id):
        vector = self.get_embedding(text)
        new_embedding = vector[:]
        for _ in range(1536 - len(new_embedding)):
            new_embedding.append(0.0)
        print(new_embedding)
        self.index.upsert([(doc_id, new_embedding, {"text": text})], namespace="leave-workspace")

    def process_policy_document(self, file, doc_id):
        text = self.extract_text_from_pdf(file)  # Accepts file instead of path
        self.store_policy_embedding(text, doc_id)
        return f"Policy document {doc_id} processed successfully!"

    def query_policy(self, prompt):
        prompt_embeddings = self.get_embedding(prompt)

        new_embedding = prompt_embeddings[:]
        for _ in range(1536 - len(new_embedding)):
            new_embedding.append(0.0)

        response = self.index.query(
            namespace="leave-workspace",
            vector=new_embedding,
            top_k=20,
            include_metadata=True
        )

        retrieved_texts = [match["metadata"]["text"] for match in response["matches"]]
        flat_list = [item for sublist in retrieved_texts for item in sublist]
        context = "\n\n".join(flat_list)

        result = genai.GenerativeModel("gemini-1.5-flash").generate_content(
            f"Context:\n{context}\n\nUser Query: {prompt}\n\nAnswer:"
        )

        return result.text
