import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCareFansComponent } from './my-care-fans.component';

describe('MyCareFansComponent', () => {
  let component: MyCareFansComponent;
  let fixture: ComponentFixture<MyCareFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCareFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCareFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
