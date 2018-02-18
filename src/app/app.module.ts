import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { EnterChatComponent } from './enter-chat/enter-chat.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chat/:name', component: ChatComponent },
  { path: 'enter', component: EnterChatComponent },
  { path: '**', redirectTo: 'enter' }
];

@NgModule({
  declarations: [
    AppComponent,
    EnterChatComponent,
    ChatComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    environment.production
      ? ServiceWorkerModule.register('/ngsw-worker.js')
      : [],
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDmlg--76FbxpO5CS-NaMgV9XyT7OfCfGA',
      authDomain: 'ngsw-firechat.firebaseapp.com',
      databaseURL: 'https://ngsw-firechat.firebaseio.com',
      projectId: 'ngsw-firechat',
      storageBucket: 'ngsw-firechat.appspot.com',
      messagingSenderId: '602956867256'
    }),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
