import { TestBed } from '@angular/core/testing';

import { AweberService } from './aweber.service';

describe('AweberService', () => {
  let service: AweberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AweberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
