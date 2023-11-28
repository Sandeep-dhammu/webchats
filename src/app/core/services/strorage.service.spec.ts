/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StrorageService } from './strorage.service';

describe('Service: Strorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrorageService]
    });
  });

  it('should ...', inject([StrorageService], (service: StrorageService) => {
    expect(service).toBeTruthy();
  }));
});
