import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMoreComponent } from './video-more.component';

describe('VideoMoreComponent', () => {
  let component: VideoMoreComponent;
  let fixture: ComponentFixture<VideoMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
