import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPickerComponent } from './area-picker.component';

describe('AreaPickerComponent', () => {
  let component: AreaPickerComponent;
  let fixture: ComponentFixture<AreaPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
