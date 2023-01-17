import { TestBed } from '@angular/core/testing';

import { DWTService } from './dwt.service';

describe('DWTService', () => {
  let service: DWTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DWTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
