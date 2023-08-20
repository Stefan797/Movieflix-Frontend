import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  registerResponse: any = [];
  isActiveResponse: any = [];
  loginResponse: any = [];
  setnewGastUser: any = {};
  error = '';

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ], []),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ], []),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ], []),
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

  constructor(private router: Router, private httpService: HttpService, private registerService: RegisterService, public generalFunctionsService: GeneralFunctionsService) {}

  ngOnInit(): void {
  };

  async registerNewUser() {
    if (this.registerForm.valid) {
      let formData = this.registerForm.value;
      this.registerResponse = await this.generalFunctionsService.tryPostLoading('/sign-up/', formData);
      await this.setUserEmailAndPassword(formData);
      localStorage.setItem('token', this.loginResponse['token']);
      console.log(this.registerResponse);
      this.registerService.setRegisterResponse(this.registerResponse);
      this.registerService.setRegisterComponent();
      localStorage.setItem('CurrentUserID', this.registerResponse['id']);
      this.router.navigate(['/home']);
    }
  }

  async setUserEmailAndPassword(formData: any) {
    let loginFormdata = {
      'email': formData.email,
      'password': formData.password,
    };
    return this.loginResponse = await this.generalFunctionsService.tryPostLoading('/api-user-login/', loginFormdata);
  }

  // End Create Normal User 

  async loginAsGuest() {
    this.registerResponse = await this.createNewGuestUser();
    this.registerService.setRegisterResponse(this.registerResponse);
    console.log(this.registerResponse);
    this.registerService.setRegisterComponent();
    this.isActiveResponse = await this.setGuestUserIsActive(this.registerResponse.user_id);
    this.loginResponse = await this.loginpostData();
    localStorage.setItem('token', this.loginResponse['token']);
    console.log('This is the current user Register Response', this.registerResponse);
    localStorage.setItem('CurrentUserID', this.registerResponse['user_id']);
    this.router.navigate(['/home']);
  }

  loginpostData() {
    let formData = {
      'email': this.setnewGastUser.email,
      'password': this.setnewGastUser.password
    }
    try {
      const url = environment.baseUrl + "/api-user-login/";
      return lastValueFrom(this.httpService.postrequest(url, formData));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  setGuestUserIsActive(pkUser) {
    try {
      const url = environment.baseUrl + `/activate/${pkUser}/`;
      return lastValueFrom(this.httpService.getrequest(url));
    } catch (e) {
      this.error = 'Fehler beim Aktivieren des Accounts!';
      return null;
    }
  }

  createNewGuestUser() {
    const username = 'Gast' + this.getRandomNumber();
    const email = username + '@test.com';
    const firstname = 'guest' + username;
    const lastname = 'whoAmI' + username;
    const password = 'guest_password' + username;

    const newUser = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    };

    this.setnewGastUser = newUser;
    
    try {
      const url = environment.baseUrl + "/sign-up/";
      return lastValueFrom(this.httpService.postrequest(url, newUser));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 1000
  }

  // End Create Guest User 

  showPassword(passwordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  // End Other functions
}
