import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  checkboxSrc = './assets/img/checkbox-white.png';
  checkboxVisible = true;
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

  constructor(private router: Router, private httpService: HttpService, public generalFunctionsService: GeneralFunctionsService) {}

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      this.loginResponse = await this.generalFunctionsService.tryPostLoading('/api-user-login/', formData);
      this.router.navigate(['/home']);
      localStorage.setItem('token', this.loginResponse['token']);
    }
  }

  // End Login User 

  changeCheckboxValue() {
    this.checkboxVisible = !this.checkboxVisible;
    if (!this.checkboxVisible) {
      
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
