import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-register-successfully',
  templateUrl: './register-successfully.component.html',
  styleUrls: ['./register-successfully.component.sass']
})
export class RegisterSuccessfullyComponent implements OnInit, OnDestroy {

  guestUserRegistration = false;
  normalUserRegistration = false;
  currentUserResponse: any = [];
  // response: any = [];

  // animateContainer: boolean = false;

  private timer: any;

  async ngOnInit(): Promise<void> {
    await this.showregisterMessage();
  }

  constructor(private registerService: RegisterService, public generalFunctionsService: GeneralFunctionsService) { }

  async showregisterMessage() {
    this.sethideRegisterSuccessMessage();
    let currentuserID = localStorage.getItem('CurrentUserID');
    this.currentUserResponse = await this.generalFunctionsService.tryLoading(`/userAPI/${currentuserID}/`);
    if (this.currentUserResponse.username && /^Gast\d+$/.test(this.currentUserResponse.username)) {
      this.guestUserRegistration = true;
      this.normalUserRegistration = false;
      console.log(this.guestUserRegistration);
    } else {
      this.guestUserRegistration = false;
      this.normalUserRegistration = true;
      console.log(this.normalUserRegistration);
    }
  }

  sethideRegisterSuccessMessage() {
    this.timer = setTimeout(() => {
      this.hideRegisterSuccessMessage();
    }, 15000);
  }

  hideRegisterSuccessMessage() {
    this.registerService.hideRegisterComponent();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
