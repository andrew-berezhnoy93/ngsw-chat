import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { SwPush } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PushService {
  serverPublicKey: string;
  constructor(private swPush: SwPush, private db: AngularFireDatabase) {
    this.serverPublicKey =
      'BLJek4icYn3Q_5H67Id5c3X__tyHBKP4ayVlluqMq7U-0clFpECVm3lttiXWnGawrd2Cq1CUFSv4-axWTk4Hcug';
  }

  subscribe() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.serverPublicKey
      })
      .then(pushSubscription => {
        // Passing subscription object to our backend
        this.db
          .list('subscribers')
          .push(pushSubscription)
          .then(
            res => {
              console.log('[App] Add subscriber request answer', res);

              // const snackBarRef = this.snackBar.open('Now you are subscribed', null, {
              //   duration: this.snackBarDuration
              // });
            },
            err => {
              console.log('[App] Add subscriber request failed', err);
            }
          );
      })
      .catch(err => {
        console.error('swsssdd', err);
      });
  }

  showMessages() {
    return this.swPush.messages;
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription.subscribe(
      pushSubscription => {
        console.log('[App] pushSubscription', pushSubscription);

        // Delete the subscription from the backend
        // this.db
        //   .list('subscriber')
        //   .remove(pushSubscription[0])
        //   .then(() => {
        //   });
        this.dbPush(pushSubscription);
        pushSubscription
          .unsubscribe()
          .then(success => {
            console.log('[App] Unsubscription successful', success);
          })
          .catch(err => {
            console.log('[App] Unsubscription failed', err);
          });
      },
      err => {
        console.log('[App] Delete subscription request failed', err);
      }
    );
  }

  // urlBase64ToUint8Array(base64String) {
  //   console.log('erererq');
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   console.log('erererw');
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');
  //   console.log('erererr');
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   console.log('erererss');
  //   return outputArray;
  // }

  dbPush(subscription) {
    this.db
      .list('subscriptions')
      .update('add subscriber', {
        action: 'subscribe',
        subscription: subscription
      });
  }

  dbDelete() {}
}
