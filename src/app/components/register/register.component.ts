import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
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

  constructor(private router: Router) {
    this.registerForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  };

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.postData(formData);
    }
  }

  async postData(formData: any) {
    try {
      // const result = await fetchPost('http://127.0.0.1:8000/sign-up/', formData); //  stefan-jonas.developerakademie.org/sign-up/ 'http://127.0.0.1:8000/sign-up/',
      // console.log(result);
      // // this.router.navigate(['/home']);
      // if(!result.ok)
      //   throw new Error(result.statusText)
      // const formDataLogin = new FormData();
      
      // const result = await this.dataService.fetchPost('http://127.0.0.1:8000/api-user-login/', formData); //  https://stefan-jonas.developerakademie.org/api-user-login/
      // console.log(result);
    } catch (error) {
      //TODO what should happen if fetch fails
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
