import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhtotViewerComponent } from './phtot-viewer.component';

describe('PhtotViewerComponent', () => {
  let component: PhtotViewerComponent;
  let fixture: ComponentFixture<PhtotViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhtotViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhtotViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
