import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerResponse: any;

  constructor() { }

  setRegisterResponse(response: any) {
    this.registerResponse = response;
  }

  getRegisterResponse(): any {
    return this.registerResponse;
  }
}
