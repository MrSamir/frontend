import { TestBed } from '@angular/core/testing';

import { AppconfigurationLoaderService } from './appconfiguration-loader.service';

describe('AppconfigurationLoaderService', () => {
  let service: AppconfigurationLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppconfigurationLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
