import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: FirebaseListObservable<any[]>;
  name: string;
  message: FormControl = new FormControl();
  constructor(db: AngularFireDatabase, ar: ActivatedRoute) {
    this.name = ar.snapshot.params['name'];
    this.messages = db.list('messages');
  }

  send(text) {
    console.log(event);
    this.messages.push({
      text,
      name: this.name,
      date: new Date().toLocaleTimeString()
    });
    this.message.reset();
  }
}
