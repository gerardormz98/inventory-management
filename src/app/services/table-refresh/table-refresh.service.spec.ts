import { TestBed } from '@angular/core/testing';

import { TableRefreshService } from './table-refresh.service';

describe('TableRefreshService', () => {
  let service: TableRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
