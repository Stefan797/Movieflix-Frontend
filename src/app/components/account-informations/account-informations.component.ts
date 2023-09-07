import { Component, OnInit } from '@angular/core';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.sass']
})
export class AccountInformationsComponent implements OnInit {
  
  currentUserResponse: any = {};

  constructor(public generalFunctionsService: GeneralFunctionsService) { }

  async ngOnInit(): Promise<void> {
    let currentuserID = this.generalFunctionsService.handleGetLocalStorageUserID();
    this.currentUserResponse = await this.generalFunctionsService.tryLoading(`/userAPI/${currentuserID}/`);
    this.setUserInformations();
  }

  setUserInformations() {
    if (this.currentUserResponse['username'].includes('Gast')) {
      document.getElementById('password').innerHTML = `guest_password${this.currentUserResponse['username']}`;
    } else {
      document.getElementById('password').innerHTML = 'Unbekannt';
    }

    if (this.currentUserResponse['first_name'] == null) {
      document.getElementById('firstname').innerHTML = 'Unbekannt';
    }
    if (this.currentUserResponse['last_name'] == null) {
      document.getElementById('lastname').innerHTML = 'Unbekannt';
    }
  }

  // End set User Informations
  
  showUserStatusInfo(userStatusMessage: string) {
    if (userStatusMessage == 'show Active Information') {
      alert('User Status kann aktuell nicht geändert werden!');
    }

    if (userStatusMessage == 'show Is_Staff Information') {
      alert('User Status kann aktuell nicht geändert werden!');
    }
  }

  // End Other functions
}
