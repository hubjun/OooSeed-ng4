import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpellComponent } from './my-spell.component';

describe('MySpellComponent', () => {
  let component: MySpellComponent;
  let fixture: ComponentFixture<MySpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
