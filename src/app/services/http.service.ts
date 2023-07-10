import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getrequest(url: string) {
    return this.http.get(url);
  }

  postrequest(url: string, body: any) {
    return this.http.post(url, body);
  }

  // putrequest() {
  //   return this.http.put(url);
  // }

  // deleterequest() {
  //   return this.http.delete(url);
  // }
}
