import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterChatComponent } from './enter-chat.component';

describe('EnterChatComponent', () => {
  let component: EnterChatComponent;
  let fixture: ComponentFixture<EnterChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
