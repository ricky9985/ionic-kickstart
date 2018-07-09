import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from '../../../providers/auth/auth';

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent {
  @Output() component = new EventEmitter();
  signinForm: FormGroup;
  res: any = {
    username: ''
  };

  constructor(private fb: FormBuilder, private authProvider: AuthProvider) {
    console.log('Hello SigninComponent Component');
    this.initLoginForm();
  }

  initLoginForm() {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin(ev) {
    try {
      console.log("logging in");
      console.log(this.signinForm.getRawValue());
      let result = this.authProvider.login(this.signinForm.getRawValue());
    } catch (e) {

    }
  }

  signUp() {
    console.log("signup clicked");
    this.component.emit("signup");
  }
}
