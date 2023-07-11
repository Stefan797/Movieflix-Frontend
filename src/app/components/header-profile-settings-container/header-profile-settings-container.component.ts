import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header-profile-settings-container',
  templateUrl: './header-profile-settings-container.component.html',
  styleUrls: ['./header-profile-settings-container.component.sass']
})
export class HeaderProfileSettingsContainerComponent {
  
  logoutResponse: any = [];

  error = '';

  constructor(public hoverService: HoverService, private router: Router, private httpService: HttpService) {}

  async logout() {
    this.logoutResponse = await this.sendLogoutRequest(); // evtl noch Antwort Erfolgreich ausgeloggt als text wiedergeben. Aktuell logoutResponse ist null
    this.router.navigate(['/de']);
    localStorage.removeItem('token');
  }

  sendLogoutRequest() {
    try {
      const url = environment.baseUrl + "/logout/";
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }
}
