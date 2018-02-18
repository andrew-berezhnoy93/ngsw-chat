import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: FirebaseListObservable<any[]>;
  name: string;
  message: FormControl = new FormControl();
  constructor(db: AngularFireDatabase, ar: ActivatedRoute, sw: SwPush) {
    this.name = ar.snapshot.params['name'];
    sw
      .requestSubscription({
        serverPublicKey: 'tab8nm0_U0_yqvSO4Vd3YcxGVI-4dIGos2Ta9VWpRdo'
      })
      .then(value => {
        console.log('sdsds', value);
      });
    sw.subscription.subscribe(subscription => {
      console.log('subs', subscription);
    });
    this.messages = db.list('messages');
    sw.messages.subscribe(message => {
      console.log(message);
    });
  }

  send(text) {
    this.messages.push({
      text,
      name: this.name,
      date: new Date().toLocaleTimeString()
    });
    this.message.reset();
  }
}
