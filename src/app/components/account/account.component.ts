import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerallyFunctionsService } from 'src/app/services/generally-functions.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  // userIsStaffUser: boolean = false;

  guestUserRegistration = false;
  normalUserRegistration = false;
  response: any = [];

  constructor(private registerService: RegisterService, private router: Router, public generallyFunctionsService: GenerallyFunctionsService) { }

  ngOnInit(): void {
    this.getRegisterInformations();
  }

  getRegisterInformations() {
    this.response = this.registerService.getRegisterResponse();
    console.log(this.response);
  }

  checkboxVisible = true;

  changeCheckboxValue() {
    this.checkboxVisible = !this.checkboxVisible;
  }

}
