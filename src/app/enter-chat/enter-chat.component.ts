import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../common/services/local-storage.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-enter-chat',
  templateUrl: './enter-chat.component.html',
  styleUrls: ['./enter-chat.component.css']
})
export class EnterChatComponent implements OnInit {
  @Output() name: EventEmitter<any> = new EventEmitter();
  model: any;
  constructor(private _ls: LocalStorageService) {}

  ngOnInit() {}

  change(model) {
    this._ls.setName(model);
    this.name.emit(model);
  }
}
