import { TestBed } from '@angular/core/testing';

import { CheckDashboardGuard } from './check-dashboard.guard';

describe('CheckDashboardGuard', () => {
  let guard: CheckDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
