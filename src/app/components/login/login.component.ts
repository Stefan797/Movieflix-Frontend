import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  checkboxSrc = './assets/img/checkbox-white.png';

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

  constructor(private router: Router) {
    this.loginForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  }

  async postData(formData: any) {
    // const result = await t.fetchPost('http://127.0.0.1:8000/api-user-login/', formData); //  https://stefan-jonas.developerakademie.org/api-user-login/
    // console.log(result);

    // if (result.token = '') {
    //   this.router.navigate(['/home']);
    // }
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.postData(formData);
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
