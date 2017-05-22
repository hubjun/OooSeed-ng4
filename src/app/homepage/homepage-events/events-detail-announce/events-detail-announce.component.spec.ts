import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailAnnounceComponent } from './events-detail-announce.component';

describe('EventsDetailAnnounceComponent', () => {
  let component: EventsDetailAnnounceComponent;
  let fixture: ComponentFixture<EventsDetailAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDetailAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDetailAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
