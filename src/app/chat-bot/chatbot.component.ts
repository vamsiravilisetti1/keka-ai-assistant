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
    this.messages = this.chatBotService.messages;
  }

  toggleChatbox() {
    this.chatboxOpen = !this.chatboxOpen;
  }

  handlePromptChange($event: any) {
    this.messages.push({
      from: 'user',
      text: $event
    });
    this.chatBotService.submitPrompt($event).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: res.response.trim()
          })}, 500);
      },
      error: (err) => {
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: err.error?.error?.message
          });
        }, 500);
    }});
  }

  clearChat() {
    this.messages = [];
    this.chatBotService.messages = []; 
    this.toggleChatbox();
    this.ngOnInit()
  }
}
