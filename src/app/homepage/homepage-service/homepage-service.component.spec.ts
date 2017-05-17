import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageServiceComponent } from './homepage-service.component';

describe('HomepageServiceComponent', () => {
  let component: HomepageServiceComponent;
  let fixture: ComponentFixture<HomepageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
