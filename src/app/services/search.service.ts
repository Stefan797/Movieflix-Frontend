import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject = new BehaviorSubject<string>('');

  constructor() {}

  get searchTerm$() {
    return this.searchTermSubject.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  // private searchTermSubject = new BehaviorSubject<string>('');

  // constructor() {}

  // get searchTerm$() {
  //   return this.searchTermSubject.asObservable();
  // }

  // setSearchTerm(searchTerm: string) {
  //   this.searchTermSubject.next(searchTerm);
  // }
}
