import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FansChannelComponent } from './fans-channel.component';

describe('FansChannelComponent', () => {
  let component: FansChannelComponent;
  let fixture: ComponentFixture<FansChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FansChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FansChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
