import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-enter-chat',
  templateUrl: './enter-chat.component.html',
  styleUrls: ['./enter-chat.component.css']
})
export class EnterChatComponent implements OnInit {
  name: FormControl = new FormControl();

  constructor(private router: Router, private swPush: SwPush) {}

  ngOnInit() {}
}
