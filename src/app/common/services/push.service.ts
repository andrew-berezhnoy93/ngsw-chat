import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { SwPush } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PushService {
  constructor(private swPush: SwPush, private db: AngularFireDatabase) {}

  subscribe() {
    const convertedVapidKey: any = this.urlBase64ToUint8Array(
      'BLJek4icYn3Q_5H67Id5c3X__tyHBKP4ayVlluqMq7U-0clFpECVm3lttiXWnGawrd2Cq1CUFSv4-axWTk4Hcug'
    );
    this.swPush
      .requestSubscription({
        serverPublicKey: convertedVapidKey
      })
      .then(pushSubscription => {
        // Passing subscription object to our backend
        this.db.list('subscriber').push(pushSubscription).then(
          res => {
            console.log('[App] Add subscriber request answer', res);
          },
          err => {
            console.log('[App] Add subscriber request failed', err);
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  showMessages(): Observable<object> {
    return this.swPush.messages;
    // this.swPush.messages.subscribe(message => {
    //   console.log('[App] Push message received', message);
    //   const notification = message;
    // });
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription.subscribe(
      pushSubscription => {
        console.log('[App] pushSubscription', pushSubscription);

        // Delete the subscription from the backend
        this.db
          .list('subscriber')
          .remove(pushSubscription[0].$key)
          .then(() => {

            pushSubscription
            .unsubscribe()
            .then(success => {
              console.log('[App] Unsubscription successful', success);
            })
            .catch(err => {
              console.log('[App] Unsubscription failed', err);
            });

          });
      },
      err => {
        console.log('[App] Delete subscription request failed', err);
      }
    );
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
