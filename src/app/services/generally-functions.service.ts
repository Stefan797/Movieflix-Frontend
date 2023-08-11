import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenerallyFunctionsService {

  constructor(private router: Router) { }

  backToHome() {
    this.router.navigate(['/home']);
  }
}
