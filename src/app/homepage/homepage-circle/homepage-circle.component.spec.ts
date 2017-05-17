import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCircleComponent } from './homepage-circle.component';

describe('HomepageCircleComponent', () => {
  let component: HomepageCircleComponent;
  let fixture: ComponentFixture<HomepageCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
