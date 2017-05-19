import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFansComponent } from './my-fans.component';

describe('MyFansComponent', () => {
  let component: MyFansComponent;
  let fixture: ComponentFixture<MyFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
