import { TestBed, inject } from '@angular/core/testing';

import { FeatureddrinksService } from './featureddrinks.service';

describe('FeatureddrinksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureddrinksService]
    });
  });

  it('should be created', inject([FeatureddrinksService], (service: FeatureddrinksService) => {
    expect(service).toBeTruthy();
  }));
});
