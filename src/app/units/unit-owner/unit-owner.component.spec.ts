import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOwnerComponent } from './unit-owner.component';

describe('UnitOwnerComponent', () => {
  let component: UnitOwnerComponent;
  let fixture: ComponentFixture<UnitOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
