import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLaunchComponent } from './my-launch.component';

describe('MyLaunchComponent', () => {
  let component: MyLaunchComponent;
  let fixture: ComponentFixture<MyLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
