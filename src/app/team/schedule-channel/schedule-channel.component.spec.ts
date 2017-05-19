import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleChannelComponent } from './schedule-channel.component';

describe('ScheduleChannelComponent', () => {
  let component: ScheduleChannelComponent;
  let fixture: ComponentFixture<ScheduleChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
