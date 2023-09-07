import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  checkboxSrc = './assets/img/checkbox-white.png';
  checkboxVisible = true;
  doNotMemorizeUserData = false;
  error = '';
  loginResponse: any = [];

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
    ], []),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ], [])
  });

  constructor(private router: Router, private httpService: HttpService, public generalFunctionsService: GeneralFunctionsService) { }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      // console.log('', formData);
      this.loginResponse = await this.generalFunctionsService.tryPostLoading('/api-user-login/', formData);
      console.log(this.loginResponse);
      // debugger;
      let lastUserID = localStorage.getItem('CurrentUserID');
      if (this.doNotMemorizeUserData) {
        localStorage.removeItem('token');
        localStorage.removeItem('CurrentUserID');
        sessionStorage.setItem('token', this.loginResponse['token']);
        sessionStorage.setItem('CurrentUserID', this.loginResponse['user_id']);
      } else {
        localStorage.setItem('token', this.loginResponse['token']);
        localStorage.setItem('CurrentUserID', this.loginResponse['user_id']);
      }

      // localStorage.setItem('token', this.loginResponse['token']);
      this.router.navigate(['/home']);
    }
  }

  // End Login User 

  changeCheckboxValue() {
    this.checkboxVisible = !this.checkboxVisible;
    if (!this.checkboxVisible) {
      this.doNotMemorizeUserData = true;
    } else {
      this.doNotMemorizeUserData = false;
    }
  }

  showPassword(passwordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  // End Other functions 
}
