from flask import Blueprint, request, jsonify
from apiservice import PolicyService
import uuid

policy_bp = Blueprint("policy", __name__)
policy_service = PolicyService()

@policy_bp.route("/process_policy", methods=["POST"])
def process_policy():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    doc_id = str(uuid.uuid4())

    policy_service.process_policy_document(file, doc_id)

    return jsonify({"message": f"Policy document {doc_id} processed successfully!"})

@policy_bp.route("/query", methods=["POST"])
def query_policy():
    data = request.json
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400

    response_text = policy_service.query_policy(prompt)
    return jsonify({"response": response_text})
