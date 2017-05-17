import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJoinComponent } from './my-join.component';

describe('MyJoinComponent', () => {
  let component: MyJoinComponent;
  let fixture: ComponentFixture<MyJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
