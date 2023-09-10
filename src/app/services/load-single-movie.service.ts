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
  lastpath = '';

  constructor(private http: HttpClient) { }

  async loadSingleM(givenID: number, lastpath: string) {
    this.SingleMovieResponse = await this.loadSingleData(givenID);
    this.lastpath = lastpath; 
  }

  loadSingleData(givenID: number) {
    const id = givenID;
    try {
      const url = environment.baseUrl + `/movieAPI/${id}/`;
      return lastValueFrom(this.http.get(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  getSingleM() {
    let newArray: any = [];
    newArray.push(this.SingleMovieResponse);
    newArray.push(this.lastpath);
    return newArray;
  }
}
