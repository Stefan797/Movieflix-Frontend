// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GenerallyFunctionsService } from 'src/app/services/generally-functions.service';
import { HttpService } from 'src/app/services/http.service';
import { RegisterService } from 'src/app/services/register.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  userIsStaffUser: boolean = false;

  guestUserRegistration = false;
  normalUserRegistration = false;
  currentUser: any = [];
  response: any = [];
  error = '';

  constructor(private registerService: RegisterService, private router: Router, private httpService: HttpService, public generallyFunctionsService: GenerallyFunctionsService) { }

  async ngOnInit(): Promise<void> {
    await this.getRegisterInformations();
    let idUser = await this.loadUser();
    this.currentUser.push(idUser);
    console.log(this.currentUser);
  }

  getRegisterInformations() {
    this.response = this.registerService.getRegisterResponse();
    console.log(this.response);
  }

  loadUser() {
    debugger;
    let userID = this.response.id;
    try {
      const url = environment.baseUrl + `/user/${userID}/userbasic/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  

  // checkboxVisible = true;

  // changeCheckboxValue() {
  //   this.checkboxVisible = !this.checkboxVisible;
  // }

}
