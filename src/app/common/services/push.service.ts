const webPush = require('web-push/src/index.js');
const sendNotification = require('/web-push/src/index.js');
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { SwPush, ServiceWorkerModule } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PushService {
  serverPublicKey: string;
  constructor(private swPush: SwPush, private db: AngularFireDatabase) {
    this.serverPublicKey =
      'BLJek4icYn3Q_5H67Id5c3X__tyHBKP4ayVlluqMq7U-0clFpECVm3lttiXWnGawrd2Cq1CUFSv4-axWTk4Hcug';
  }

  async subscribe() {
    let pushSubscription: PushSubscription;
    try {
      pushSubscription = await this.swPush.requestSubscription({
        serverPublicKey: this.serverPublicKey
      });
      console.log(pushSubscription)
      const res = await this.dbPush(pushSubscription);
      console.log('[App] Add subscriber request answer', res);
    } catch (error) {
      console.log('[App] Add subscriber request failed', error);
    }
  }

  showMessages() {
    return this.swPush.messages;
  }

  // unsubscribeFromPush() {
  //   // Get active subscription
  //   this.swPush.subscription.subscribe(
  //     pushSubscription => {
  //       console.log('[App] pushSubscription', pushSubscription);

  //       // Delete the subscription from the backend
  //       // this.db
  //       //   .list('subscriber')
  //       //   .remove(pushSubscription[0])
  //       //   .then(() => {
  //       //   });
  //       this.dbPush(pushSubscription);
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

  async dbPush(subscription): Promise<any> {
    try {
      console.log(subscription);
      await this.db.list('subscriptions').push({
        action: 'subscribe',
        subscription: subscription
      });
    } catch (error) {
      console.log('[Error] some error during push', error);
    }
    return Promise.resolve({ res: 200, message: 'pushed subscription' });
  }

  dbDelete() {}
}
