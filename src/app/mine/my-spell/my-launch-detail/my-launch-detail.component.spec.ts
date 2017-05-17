import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLaunchDetailComponent } from './my-launch-detail.component';

describe('MyLaunchDetailComponent', () => {
  let component: MyLaunchDetailComponent;
  let fixture: ComponentFixture<MyLaunchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLaunchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLaunchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
