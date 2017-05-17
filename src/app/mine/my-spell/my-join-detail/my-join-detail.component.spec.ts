import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJoinDetailComponent } from './my-join-detail.component';

describe('MyJoinDetailComponent', () => {
  let component: MyJoinDetailComponent;
  let fixture: ComponentFixture<MyJoinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJoinDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
