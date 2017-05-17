import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageShareComponent } from './homepage-share.component';

describe('HomepageShareComponent', () => {
  let component: HomepageShareComponent;
  let fixture: ComponentFixture<HomepageShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
