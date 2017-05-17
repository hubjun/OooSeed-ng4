import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCityComponent } from './local-city.component';

describe('LocalCityComponent', () => {
  let component: LocalCityComponent;
  let fixture: ComponentFixture<LocalCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
