import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListDetailInfoComponent } from './player-list-detail-info.component';

describe('PlayerListDetailInfoComponent', () => {
  let component: PlayerListDetailInfoComponent;
  let fixture: ComponentFixture<PlayerListDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerListDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
