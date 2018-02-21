import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view;

  change($event) {
    this.view = $event.target.value;
  }
}
