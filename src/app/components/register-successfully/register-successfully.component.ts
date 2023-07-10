import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-successfully',
  templateUrl: './register-successfully.component.html',
  styleUrls: ['./register-successfully.component.sass']
})
export class RegisterSuccessfullyComponent implements OnInit, OnDestroy {

  response: any = [];

  private timer: any;

  ngOnInit(): void {
    this.showregisterMessage();
  }

  constructor(private registerService: RegisterService) { }

  showregisterMessage(): any {
    this.sethideRegisterSuccessMessage();
    // debugger;
    //document.getElementById('register-successfully').classList.remove('hide');
    this.response = this.registerService.getRegisterResponse();
  }

  sethideRegisterSuccessMessage() {
    this.timer = setTimeout(() => {
      this.hideRegisterSuccessMessage();
    }, 10000);
  }


  hideRegisterSuccessMessage() {
    document.getElementById('register-successfully').classList.add('hide');
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
