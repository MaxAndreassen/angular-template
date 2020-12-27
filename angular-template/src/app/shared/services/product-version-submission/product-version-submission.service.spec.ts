/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductVersionSubmissionService } from './product-version-submission.service';

describe('Service: ProductVersionSubmission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductVersionSubmissionService]
    });
  });

  it('should ...', inject([ProductVersionSubmissionService], (service: ProductVersionSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
