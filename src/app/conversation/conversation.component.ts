import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
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
    const calculatedTop = this.conversationContainer.nativeElement.scrollHeight 
        - this.conversationContainer.nativeElement.clientHeight;
    if (calculatedTop != this.conversationContainer.nativeElement.scrollTop)
    this.conversationContainer.nativeElement.scrollTop = calculatedTop;
  }
  formatMessage(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Converts **text** to <b>text</b>
      .replace(/\n/g, '<br>'); // Converts \n to <br> for line breaks
  }
}
