import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
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
  currentloading = false;

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
      this.currentloading = true;
      let formData = this.registerForm.value;
      this.registerResponse = await this.generalFunctionsService.tryPostLoading('/sign-up/', formData);
      //this.isActiveResponse = await this.generalFunctionsService.tryLoading(`/activate/${this.registerResponse.user_id}/`);
      //await this.loginUser(formData);
      //await this.setInformationsToTheLocalStorage();
      this.currentloading = false;
      this.registerService.setRegisterResponse(this.registerResponse);
      this.registerService.setRegisterComponent();
      this.router.navigate(['/de/register/confirm-your-account']);
    }
  }

  async loginUser(formData: any) {
    let loginFormdata = {
      'email': formData.email,
      'password': formData.password,
    };
    return this.loginResponse = await this.generalFunctionsService.tryPostLoading('/api-user-login/', loginFormdata);
  }

  setInformationsToTheLocalStorage() {
    localStorage.setItem('CurrentUserID', this.registerResponse['user_id']);
    localStorage.setItem('token', this.loginResponse['token']);
  }

  // End Create Normal User 

  async loginAsGuest() {
    this.currentloading = true;
    await this.createNewGuestUser();
    this.isActiveResponse = await this.generalFunctionsService.tryLoading(`/activate/${this.registerResponse.user_id}/`);
    await this.loginGuestUser();
    await this.setInformationsToTheLocalStorage();
    this.currentloading = false;
    this.registerService.setRegisterResponse(this.registerResponse);
    this.registerService.setRegisterComponent();
    this.router.navigate(['/home']);
  }

  async createNewGuestUser() {
    const username = 'Gast' + this.getRandomNumber();
    const email = username + '@test.com';
    const firstname = 'guest' + username;
    const lastname = 'whoAmI' + username;
    const password = 'guest_password' + username;

    const newUser = {username: username, email: email, firstname: firstname, lastname: lastname, password: password};
    this.setnewGastUser = newUser;

    return this.registerResponse = await this.generalFunctionsService.tryPostLoading('/sign-up/', newUser);
  }
  
  async loginGuestUser() {
    let formData = {
      'email': this.setnewGastUser.email,
      'password': this.setnewGastUser.password
    }
    return this.loginResponse = await this.generalFunctionsService.tryPostLoading('/api-user-login/', formData);
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 2001) + 1000; // Generate a random number between 1000 and 2000
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
