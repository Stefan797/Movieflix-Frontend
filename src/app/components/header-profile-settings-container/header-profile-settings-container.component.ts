import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';
import { HoverService } from 'src/app/services/hover.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header-profile-settings-container',
  templateUrl: './header-profile-settings-container.component.html',
  styleUrls: ['./header-profile-settings-container.component.sass']
})
export class HeaderProfileSettingsContainerComponent {
  
  logoutResponse: any = [];
  error = '';

  constructor(public hoverService: HoverService, private router: Router, private httpService: HttpService, public generalFunctionsService: GeneralFunctionsService) {}

  async logout() {
    this.logoutResponse = await this.generalFunctionsService.tryLoading(`/logout/`);
    this.router.navigate(['/de']);
    localStorage.removeItem('token');
  }
}