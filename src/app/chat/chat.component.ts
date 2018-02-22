import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PushService } from '../common/services/push.service';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message: FormControl = new FormControl();
  messages: FirebaseListObservable<any[]>;
  notifications: any[] = [];
  unsubscribed = false;
  @Input() name: string;
  constructor(
    public db: AngularFireDatabase,
    private pushService: PushService
  ) {
    this.messages = db.list('messages');
    db
      .list('subscriptions')
      .push({ one: '12121212' })
      .then(res => {
        console.log('res', res);
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

  showMessages() {
    this.pushService.showMessages().subscribe(messages => {
      this.notifications = messages['notifications'];
      console.log('messages', messages);
    });
  }

  subscribe() {
    this.pushService.subscribe();
  }

  async unsubscribeFromPush() {
    await this.pushService.unsubscribeFromPush();
    this.unsubscribed = !this.unsubscribed;
  }

  // ngOnDestroy() {
  //   this.pushService.unsubscribeFromPush();
  // }
}
