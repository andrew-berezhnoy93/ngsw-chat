import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalStorageService {
  $name = new BehaviorSubject<string>(
    JSON.parse(window.localStorage.getItem('name'))
  );

  public get name(): string {
    return this.$name.getValue();
  }

  public setName(name: string) {
    window.localStorage.setItem('name', JSON.stringify(name));
    this.$name.next(JSON.parse(window.localStorage.getItem('name')));
  }

  public removeName(): void {
    window.localStorage.removeItem('name');
    this.$name.next(null);
  }
}
