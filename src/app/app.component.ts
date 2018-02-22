import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { LocalStorageService } from './common/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view: string;
  /**
   *
   */
  constructor(private _ls: LocalStorageService) {
    this.view = this._ls.name;
  }
  change(name) {
    this.view = name;
  }

  clear() {
    this._ls.removeName();
    this.view = null;
  }
}
