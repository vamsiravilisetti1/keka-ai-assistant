import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConversationMessage } from '../interfaces/conversation-message';

const apiUrl: string = 'http://127.0.0.1:5000/query';
const uploadUrl: string = 'http://127.0.0.1:5000/process_policy';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  public messages: IConversationMessage[] = [
    {
      text: "Hello Keka bot",
      from: "user"
    },
    {
      text: "Hello User, I am Keka Bot",
      from: "bot"
    }
  ];

  constructor(private http: HttpClient) {}

  // API Call to send user query to chatbot
  submitPrompt(userInput: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(apiUrl, { prompt: userInput });
  }

  // API Call to upload document (PDF) to the AI model
  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Attaching file

    return this.http.post<any>(uploadUrl, formData); // Sending file to Flask API
  }
}
