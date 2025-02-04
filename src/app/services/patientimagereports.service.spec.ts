import { TestBed } from '@angular/core/testing';

import { PatientimagereportsService } from './patientimagereports.service';

describe('PatientimagereportsService', () => {
  let service: PatientimagereportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientimagereportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
