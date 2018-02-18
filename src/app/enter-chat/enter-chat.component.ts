import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-enter-chat',
  templateUrl: './enter-chat.component.html',
  styleUrls: ['./enter-chat.component.css']
})
export class EnterChatComponent implements OnInit {
  name: FormControl = new FormControl();

  constructor() {}

  ngOnInit() {}
}
