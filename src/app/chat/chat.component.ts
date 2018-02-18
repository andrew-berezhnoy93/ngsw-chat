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
  constructor(public db: AngularFireDatabase, ar: ActivatedRoute, public swPush: SwPush) {
    this.name = ar.snapshot.params['name'];
    this.subscribe();
    this.messages = db.list('messages');
    this.showMessages();
  }

  send(text) {
    this.messages.push({
      text,
      name: this.name,
      date: new Date().toLocaleTimeString()
    });
    this.message.reset();
  }

  subscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: 'BLJek4icYn3Q_5H67Id5c3X__tyHBKP4ayVlluqMq7U-0clFpECVm3lttiXWnGawrd2Cq1CUFSv4-axWTk4Hcug'
    })
      .then(pushSubscription => {

        // Passing subscription object to our backend
        this.db.list('subscriber').push(pushSubscription);
        this.db.list('subscriber').subscribe(res => {
            console.log('[App] Add subscriber request answer', res);
          },
          err => {
            console.log('[App] Add subscriber request failed', err);
          });
      })
      .catch(err => {
        console.error(err);
      });

  }

  showMessages() {

    this.swPush.messages
      .subscribe(message => {

        console.log('[App] Push message received', message);
        const notification = message;
      });
    }
  }
