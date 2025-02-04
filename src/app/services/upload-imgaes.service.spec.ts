import { TestBed } from '@angular/core/testing';

import { UploadImgaesService } from './upload-imgaes.service';

describe('UploadImgaesService', () => {
  let service: UploadImgaesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImgaesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
