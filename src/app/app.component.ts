import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: FirebaseListObservable<any[]>;

  message: FormControl = new FormControl();
  constructor(db: AngularFireDatabase) {
    this.messages = db.list('messages');
  }

  send(event) {
    this.messages.push({
      ...event,
      date: new Date().toLocaleTimeString()
    });
  }
}
