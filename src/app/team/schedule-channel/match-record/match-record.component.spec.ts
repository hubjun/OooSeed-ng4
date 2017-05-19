import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRecordComponent } from './match-record.component';

describe('MatchRecordComponent', () => {
  let component: MatchRecordComponent;
  let fixture: ComponentFixture<MatchRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
