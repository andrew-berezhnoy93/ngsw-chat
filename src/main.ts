import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (location.protocol !== 'https:') {
  location.protocol = 'https:';
}
console.log('2');
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(async () => {
    if ('serviceWorker' in navigator && environment.production) {
      await navigator.serviceWorker.register('/ngsw-worker.js');
    }
  })
  .catch(err => console.log(err));
