import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPictureComponent } from './my-picture.component';

describe('MyPictureComponent', () => {
  let component: MyPictureComponent;
  let fixture: ComponentFixture<MyPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
