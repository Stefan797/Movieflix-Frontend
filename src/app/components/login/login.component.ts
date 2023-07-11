import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  checkboxSrc = './assets/img/checkbox-white.png';

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

  constructor(private router: Router, private httpService: HttpService) {
    this.loginForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.loginResponse = await this.postData(formData);
      this.router.navigate(['/home']);
      console.log(this.loginResponse);
      localStorage.setItem('token', this.loginResponse['token']);
    }
  }

  postData(formData: any) {
    try {
      const url = environment.baseUrl + "/api-user-login/";
      return lastValueFrom(this.httpService.postrequest(url, formData));
    } catch (e) {
      this.error = 'Fehler beim Laden!';
      return null;
    }
  }

  checkboxVisible = true;

  changeCheckboxValue() {
    this.checkboxVisible = !this.checkboxVisible;
  }

  showPassword(passwordInput: HTMLInputElement) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
}
