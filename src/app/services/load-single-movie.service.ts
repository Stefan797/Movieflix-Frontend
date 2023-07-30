import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoadSingleMovieService {
  SingleMovieResponse: any = [];
  error = '';

  constructor(private http: HttpClient) { }

  async loadSingleM(givenID: number) {
    this.SingleMovieResponse = await this.loadSingleData(givenID);

    console.log(this.SingleMovieResponse);
  }

  loadSingleData(givenID: number) {
    const id = givenID;
    try {
      const url = environment.baseUrl + `/movie/${id}/load_movie/`; //"/movieAPI/"; movie/${id}/load_movie/ movie/{id}/load_movie/
      return lastValueFrom(this.http.get(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  getSingleM() {
    return this.SingleMovieResponse;
  }
}
