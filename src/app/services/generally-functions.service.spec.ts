import { TestBed } from '@angular/core/testing';

import { GenerallyFunctionsService } from './generally-functions.service';

describe('GenerallyFunctionsService', () => {
  let service: GenerallyFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerallyFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
