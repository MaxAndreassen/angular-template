/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductGenreService } from './product-genre.service';

describe('Service: ProductGenres', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductGenreService]
    });
  });

  it('should ...', inject([ProductGenreService], (service: ProductGenreService) => {
    expect(service).toBeTruthy();
  }));
});
