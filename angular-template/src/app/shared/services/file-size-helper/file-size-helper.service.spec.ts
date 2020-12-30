/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileSizeHelperService } from './file-size-helper.service';

describe('Service: FileSizeHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileSizeHelperService]
    });
  });

  it('should ...', inject([FileSizeHelperService], (service: FileSizeHelperService) => {
    expect(service).toBeTruthy();
  }));
});
