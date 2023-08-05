import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferMovieDatasService {
  private movieDataResponse: any;
  public movieDataResponse$ = new BehaviorSubject(undefined);

  constructor() {}

  setMovieDataResponse(response: any) {
    this.movieDataResponse = response;
    console.log(this.movieDataResponse);
    this.movieDataResponse$.next(response);
  }

  getMovieDataResponse(): any {
    return this.movieDataResponse;
  }
}
