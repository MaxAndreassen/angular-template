/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductCategoryService } from './product-category.service';

describe('Service: ProductCategories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCategoryService]
    });
  });

  it('should ...', inject([ProductCategoryService], (service: ProductCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
