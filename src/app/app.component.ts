import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view;
/**
 *
 */
constructor() {
  console.log('hi4');
}
  change($event) {
    this.view = $event.target.value;
  }
}
