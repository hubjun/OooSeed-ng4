import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberModuleComponent } from './member-module.component';

describe('MemberModuleComponent', () => {
  let component: MemberModuleComponent;
  let fixture: ComponentFixture<MemberModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
