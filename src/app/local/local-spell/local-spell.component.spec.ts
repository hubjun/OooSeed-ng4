import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSpellComponent } from './local-spell.component';

describe('LocalSpellComponent', () => {
  let component: LocalSpellComponent;
  let fixture: ComponentFixture<LocalSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
