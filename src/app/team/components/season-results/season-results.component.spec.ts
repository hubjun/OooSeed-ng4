import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonResultsComponent } from './season-results.component';

describe('SeasonResultsComponent', () => {
  let component: SeasonResultsComponent;
  let fixture: ComponentFixture<SeasonResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
