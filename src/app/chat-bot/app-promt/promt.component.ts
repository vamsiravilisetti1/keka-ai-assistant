import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './promt.component.html',
  styleUrls: ['./promt.component.css']
})
export class PromptComponent {
  userInput: string = '';
  @Output() textChange = new EventEmitter<string>();

  constructor() {}

  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.textChange.emit(this.userInput.trim());
      this.userInput = ''; // Clear input after sending message
    }
  }
}
