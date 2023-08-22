import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralFunctionsService {

  error = '';

  constructor(private router: Router, private httpService: HttpService) { }

  backToHome() {
    this.router.navigate(['/home']);
  }

  tryLoading(linkEnding: string) {
    try {
      const url = environment.baseUrl + `${linkEnding}`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  tryPostLoading(linkEnding: string, data: any) {
    try {
      const url = environment.baseUrl + `${linkEnding}`;
      const formData = data;
      return lastValueFrom(this.httpService.postrequest(url, formData));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }
}
