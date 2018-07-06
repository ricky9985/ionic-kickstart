import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('Hello SignupComponent Component');
    this.initLoginForm();
  }

  initLoginForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      companyName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    })
  }
}
