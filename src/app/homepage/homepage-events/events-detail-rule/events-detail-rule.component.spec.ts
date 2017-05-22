import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailRuleComponent } from './events-detail-rule.component';

describe('EventsDetailRuleComponent', () => {
  let component: EventsDetailRuleComponent;
  let fixture: ComponentFixture<EventsDetailRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsDetailRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsDetailRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
