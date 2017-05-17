import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSpellDetailComponent } from './local-spell-detail.component';

describe('LocalSpellDetailComponent', () => {
  let component: LocalSpellDetailComponent;
  let fixture: ComponentFixture<LocalSpellDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalSpellDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSpellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
