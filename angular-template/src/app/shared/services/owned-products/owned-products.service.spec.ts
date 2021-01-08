/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OwnedProductsService } from './owned-products.service';

describe('Service: OwnedProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnedProductsService]
    });
  });

  it('should ...', inject([OwnedProductsService], (service: OwnedProductsService) => {
    expect(service).toBeTruthy();
  }));
});
