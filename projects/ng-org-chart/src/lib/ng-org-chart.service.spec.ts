import { TestBed } from '@angular/core/testing';

import { NgOrgChartService } from './ng-org-chart.service';

describe('NgOrgChartService', () => {
  let service: NgOrgChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOrgChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
