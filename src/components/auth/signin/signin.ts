import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'signin',
  templateUrl: 'signin.html'
})
export class SigninComponent {
  @Output() component = new EventEmitter();
  @Output() dataForm = new EventEmitter();
  signinForm: FormGroup;
  res: any = {
    username: ''
  };

  constructor(private fb: FormBuilder) {
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
    console.log("logging in");
    this.dataForm.emit({method: "signin", data: this.signinForm})
  }

  switchToSignUp() {
    console.log("signup clicked");
    this.component.emit("signup");
  }
}
