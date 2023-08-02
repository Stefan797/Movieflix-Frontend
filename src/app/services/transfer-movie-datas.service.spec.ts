import { TestBed } from '@angular/core/testing';

import { TransferMovieDatasService } from './transfer-movie-datas.service';

describe('TransferMovieDatasService', () => {
  let service: TransferMovieDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferMovieDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
