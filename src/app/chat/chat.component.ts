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
  constructor(public db: AngularFireDatabase, ar: ActivatedRoute) {
    this.name = ar.snapshot.params['name'];
    this.messages = db.list('messages');
  }

  send(text) {
    this.messages.push({
      text,
      name: this.name,
      date: new Date().toLocaleTimeString()
    });
    this.message.reset();
  }

  // subscribe() {
  //   const convertedVapidKey: any = this.urlBase64ToUint8Array(
  //     'BLJek4icYn3Q_5H67Id5c3X__tyHBKP4ayVlluqMq7U-0clFpECVm3lttiXWnGawrd2Cq1CUFSv4-axWTk4Hcug'
  //   );
  //   this.swPush
  //     .requestSubscription({
  //       serverPublicKey: convertedVapidKey
  //     })
  //     .then(pushSubscription => {
  //       // Passing subscription object to our backend
  //       this.db.list('subscriber').push(pushSubscription);
  //       this.db.list('subscriber').subscribe(
  //         res => {
  //           console.log('[App] Add subscriber request answer', res);
  //         },
  //         err => {
  //           console.log('[App] Add subscriber request failed', err);
  //         }
  //       );
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  // showMessages() {
  //   this.swPush.messages.subscribe(message => {
  //     console.log('[App] Push message received', message);
  //     const notification = message;
  //   });
  // }

  // unsubscribeFromPush() {
  //   // Get active subscription
  //   this.swPush.subscription.subscribe(
  //     pushSubscription => {
  //       console.log('[App] pushSubscription', pushSubscription[0]);

  //       // Delete the subscription from the backend
  //       this.db
  //         .list('subscriber')
  //         .remove(pushSubscription[0])
  //         .then(res => console.log('removed'));

  //       pushSubscription
  //         .unsubscribe()
  //         .then(success => {
  //           console.log('[App] Unsubscription successful', success);
  //         })
  //         .catch(err => {
  //           console.log('[App] Unsubscription failed', err);
  //         });
  //     },
  //     err => {
  //       console.log('[App] Delete subscription request failed', err);
  //     }
  //   );
  // }

  // urlBase64ToUint8Array(base64String) {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }
}
