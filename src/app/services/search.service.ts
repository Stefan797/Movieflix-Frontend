import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject = new BehaviorSubject<string>('');

  get searchTerm$() {
    return this.searchTermSubject.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
    console.log('', this.searchTermSubject);
  }

  // //private apiUrl = 'http://example.com/api/search';
  // private apiUrl = 'http://127.0.0.1:8000/api/search';
  // //private apiUrlServer = 'http://example.com/api/search';

  // constructor(private http: HttpClient) {}

  // searchByTitle(title: string) {
  //   return this.http.get<any[]>(`${this.apiUrl}?title=${title}`);
  // }
}
