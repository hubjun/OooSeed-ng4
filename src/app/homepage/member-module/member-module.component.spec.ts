import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberModule } from './member-module.component';

describe('MemberModuleComponent', () => {
  let component: MemberModule;
  let fixture: ComponentFixture<MemberModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
