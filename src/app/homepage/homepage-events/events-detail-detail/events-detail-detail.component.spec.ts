import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailDetailComponent } from './events-detail-detail.component';

describe('EventsDetailDetailComponent', () => {
  let component: EventsDetailDetailComponent;
  let fixture: ComponentFixture<EventsDetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
