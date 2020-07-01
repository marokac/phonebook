import { TestBed } from '@angular/core/testing';

import { ContuctsService } from './contucts.service';

describe('ContuctsService', () => {
  let service: ContuctsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContuctsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
