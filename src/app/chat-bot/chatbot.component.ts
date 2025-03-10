import { Component } from '@angular/core';
import { ChatBotService } from './chatbot-service';
import { IConversationMessage } from '../interfaces/conversation-message';

@Component({
  selector: 'app-chatbot',
  providers: [ChatBotService],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  public messages: IConversationMessage[] = [];
  chatboxOpen: boolean = true;

  constructor(private chatBotService: ChatBotService) {}

  ngOnInit() {
    this.messages = [...this.chatBotService.messages]; // Ensure reference safety
  }

  toggleChatbox() {
    this.chatboxOpen = !this.chatboxOpen;
  }

  handlePromptChange($event: any) {
    this.messages.push({
      from: 'user',
      text: $event
    });

    // Add a temporary typing indicator
    const typingMessage = {
      from: 'bot',
      text: '',
      isTyping: true
    };
    this.messages.push(typingMessage);

    this.chatBotService.submitPrompt($event).subscribe({
      next: (res) => {
        setTimeout(() => {
          // Remove typing indicator before adding the response
          this.messages = this.messages.filter(msg => !msg.isTyping);
          this.messages.push({
            from: 'bot',
            text: res.response.trim()
          });
        }, 500);
      },
      error: (err) => {
        setTimeout(() => {
          this.messages = this.messages.filter(msg => !msg.isTyping);
          this.messages.push({
            from: 'bot',
            text: err.error?.error?.message || 'Something went wrong!'
          });
        }, 500);
      }
    });
  }

  clearChat() {
    this.messages = [];
    this.chatBotService.messages = []; 
  }
}
