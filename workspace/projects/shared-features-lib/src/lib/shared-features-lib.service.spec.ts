import { TestBed } from '@angular/core/testing';

import { SharedFeaturesLibService } from './shared-features-lib.service';

describe('SharedFeaturesLibService', () => {
  let service: SharedFeaturesLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFeaturesLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
