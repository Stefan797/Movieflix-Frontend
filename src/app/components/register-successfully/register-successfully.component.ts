import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-successfully',
  templateUrl: './register-successfully.component.html',
  styleUrls: ['./register-successfully.component.sass']
})
export class RegisterSuccessfullyComponent implements OnInit, OnDestroy {

  guestUserRegistration = false;
  normalUserRegistration = false;
  response: any = [];

  // animateContainer: boolean = false;

  private timer: any;

  ngOnInit(): void {
    this.showregisterMessage();
    // setTimeout(() => {
    //   this.animateContainer = true;
    // }, 1000);
  }

  constructor(private registerService: RegisterService) { }

  showregisterMessage(): any {
    this.sethideRegisterSuccessMessage();
    this.response = this.registerService.getRegisterResponse();
    console.log('Get register response', this.response);
    if (this.response.username && /^Gast\d+$/.test(this.response.username)) {
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
