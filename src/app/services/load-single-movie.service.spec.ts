import { TestBed } from '@angular/core/testing';

import { LoadSingleMovieService } from './load-single-movie.service';

describe('LoadSingleMovieService', () => {
  let service: LoadSingleMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadSingleMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
