import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerResponse: any;
  isRegistered: boolean;
  private isRegisteredChanged = new Subject<boolean>();

  constructor() { 
    this.isRegistered = false; 
  }

  setRegisterResponse(response: any) {
    this.registerResponse = response;
  }

  getRegisterResponse(): any {
    return this.registerResponse;
  }

  setRegisterComponent(): any {
    this.isRegistered = true;
    this.isRegisteredChanged.next(this.isRegistered);
  }

  hideRegisterComponent(): any {
    this.isRegistered = false;
    this.isRegisteredChanged.next(this.isRegistered);
  }

  getIsRegisteredChanged(): Observable<boolean> {
    return this.isRegisteredChanged.asObservable();
  }

  handleRegisterComponent() {
    if (this.isRegistered == true) {
      return true;
    } else {
      return false;
    }
  }
}
