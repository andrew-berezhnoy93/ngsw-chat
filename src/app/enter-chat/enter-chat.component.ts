import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-enter-chat',
  templateUrl: './enter-chat.component.html',
  styleUrls: ['./enter-chat.component.css']
})
export class EnterChatComponent {
  @Output() name: EventEmitter<any> = new EventEmitter();
  text: string;
  constructor() {}

  change($event) {
    console.log($event);
    this.text = $event;
    this.name.emit(this.text);
  }
}
