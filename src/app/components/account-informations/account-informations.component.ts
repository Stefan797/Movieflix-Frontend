import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-account-informations',
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.sass']
})
export class AccountInformationsComponent implements OnInit {
  userIsNormalUser: boolean = false;
  userIsGuestUser: boolean = false;
  errorMessage: boolean = false;


  guestUserRegistration = false;
  normalUserRegistration = false;
  response: any = [];

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.getRegisterInformations();
  }

  getRegisterInformations() {
    this.response = this.registerService.getRegisterResponse();
    if (this.response.username.includes('Gast')) {
      this.userIsGuestUser = true;
    } else {
      this.userIsNormalUser = true;
    }
  }

  showUserStatusInfo(userStatusMessage: string) {
    if (userStatusMessage == 'show Active Information') {
      alert('User Status kann akktuell nicht geändert werden!');
    }

    if (userStatusMessage == 'show Is_Staff Information') {
      alert('User Status kann akktuell nicht geändert werden!');
    }
  }

  // ngAfterViewInit() {
  //   if (this.userIsNormalUser == false && this.userIsGuestUser == false) {
  //     this.errorMessage = true;
  //   }
  // }
}
