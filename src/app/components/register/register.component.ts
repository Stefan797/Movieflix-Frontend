import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  registerResponse: any = [];
  isActiveResponse: any = [];

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

  constructor(private router: Router, private httpService: HttpService, private registerService: RegisterService) {
    this.registerForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  };

  async registerNewUser() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.registerResponse = await this.postData(formData);
      this.registerService.setRegisterResponse(this.registerResponse);
      this.registerService.setRegisterComponent();
      this.router.navigate(['/home']);
    }
  }

  postData(formData: any) {
    try {
      const url = environment.baseUrl + "/sign-up/";
      return lastValueFrom(this.httpService.postrequest(url, formData));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  async loginAsGuest() {
    this.registerResponse = await this.createNewGuestUser();
    this.registerService.setRegisterResponse(this.registerResponse);
    console.log(this.registerResponse);
    this.registerService.setRegisterComponent();
    this.isActiveResponse = await this.setGuestUserIsActive(this.registerResponse.user_id);
    this.router.navigate(['/home']);
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
    const firstname = 'guest';
    const lastname = 'whoAmI';
    const password = 'guest_password' + username;
    console.log(password);

    const newUser = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    };

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

  showPassword(passwordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}
