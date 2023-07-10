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

  showPassword(passwordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}
