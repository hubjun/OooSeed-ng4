import { TestBed, inject } from '@angular/core/testing';

import { MineService } from './mine.service';

describe('MineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MineService]
    });
  });

  it('should ...', inject([MineService], (service: MineService) => {
    expect(service).toBeTruthy();
  }));
});
