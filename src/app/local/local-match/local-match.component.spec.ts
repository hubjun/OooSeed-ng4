import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalMatchComponent } from './local-match.component';

describe('LocalMatchComponent', () => {
  let component: LocalMatchComponent;
  let fixture: ComponentFixture<LocalMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
