import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferMovieDatasService {
  private movieDataResponse: any;

  // constructor() { 
  //   this.isRegistered = false; 
  // }

  setMovieDataResponse(response: any) {
    this.movieDataResponse = response;
    console.log(this.movieDataResponse);
  }

  getMovieDataResponse(): any {
    return this.movieDataResponse;
  }

  // handleRegisterComponent() {
  //   if (this.isRegistered == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
