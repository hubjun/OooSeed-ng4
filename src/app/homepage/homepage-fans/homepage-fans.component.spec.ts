import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFansComponent } from './homepage-fans.component';

describe('HomepageFansComponent', () => {
  let component: HomepageFansComponent;
  let fixture: ComponentFixture<HomepageFansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageFansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageFansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
