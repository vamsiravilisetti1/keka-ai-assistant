import { Component, ElementRef, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { IConversationMessage } from '../interfaces/conversation-message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements AfterViewChecked {
  @ViewChild('conversationContainer', { static: true }) conversationContainer!: ElementRef<HTMLDivElement>;
  @Input() messages: IConversationMessage[] = [];

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const container = this.conversationContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  formatMessage(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Converts **text** to <b>text</b>
      .replace(/\n/g, '<br>'); // Converts \n to <br> for line breaks
  }
}
