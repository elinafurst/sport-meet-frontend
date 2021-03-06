import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOwnerComponent } from './event-owner.component';

describe('EventOwnerComponent', () => {
  let component: EventOwnerComponent;
  let fixture: ComponentFixture<EventOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
