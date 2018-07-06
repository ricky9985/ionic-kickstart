import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent {
  @Input() text: string;
  loginForm: FormGroup;
  res: any = {
    username: ''
  };

  constructor(private fb: FormBuilder) {
    console.log('Hello SigninComponent Component');
    // this.text = 'Hello World';
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin(ev){
    console.log("logging in");
  }

}
