import { TestBed, inject } from '@angular/core/testing';

import { NgArithmeticOperationsService } from './ng-arithmetic-operations.service';

describe('NgArithmeticOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgArithmeticOperationsService]
    });
  });

  it('should be created', inject([NgArithmeticOperationsService], (service: NgArithmeticOperationsService) => {
    expect(service).toBeTruthy();
  }));
});
