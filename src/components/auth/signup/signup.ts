import {Component, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {
  @Output() component = new Subject();
  @Output() nextPage = new Subject();
  @Input() data: boolean;

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

  onSubmit() {

  }

  switchToSignIn() {
    console.log("signup clicked");
    this.component.next("signin");
  }
}
