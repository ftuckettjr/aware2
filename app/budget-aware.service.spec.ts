import { TestBed } from '@angular/core/testing';

import { BudgetAwareService } from './budget-aware.service';

describe('BudgetAwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetAwareService = TestBed.get(BudgetAwareService);
    expect(service).toBeTruthy();
  });
});
