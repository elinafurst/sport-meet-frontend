import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeatilsComponent } from './unit-deatils.component';

describe('UnitDeatilsComponent', () => {
  let component: UnitDeatilsComponent;
  let fixture: ComponentFixture<UnitDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
