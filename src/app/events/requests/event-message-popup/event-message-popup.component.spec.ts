import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMessagePopupComponent } from './event-message-popup.component';

describe('EventMessagePopupComponent', () => {
  let component: EventMessagePopupComponent;
  let fixture: ComponentFixture<EventMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMessagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
