import {Component, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import {AuthProvider} from "../../../providers/auth/auth";
import {LoaderProvider} from "../../../providers/toaster/loader";

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {
  @Output() component = new Subject();
  @Output() nextPage = new Subject();
  @Input() data: any;
  changeForm: boolean = true;
  otp: number = null;

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authProvider: AuthProvider, private loaderProvider: LoaderProvider) {
    console.log('Hello SignupComponent Component');
    this.initLoginForm();
  }

  initLoginForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      companyName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\\.\\-]*$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required]
    })
  }

  async formSubmit() {
    try {
      this.loaderProvider.showLoader("");
      // let respMessage = await this.authProvider.sendOtp(this.signupForm.controls.contact.value);
      //todo add a toaster here respMessage
      // this.toggleForm();
      this.nextPage.next("otp");
      // this.loaderProvider.hideLoader();
    } catch (error) {
      this.loaderProvider.hideLoader();
      //todo add error a toaster here
    }
  }

  toggleForm() {
    this.loaderProvider.showLoader("");
    setTimeout(() => {
      this.changeForm = !this.changeForm;
      this.loaderProvider.hideLoader();
    }, 1000);

  }

  signup() {

  }

  async verifyOtp() {
    try {
      this.loaderProvider.showLoader("");
      let respMessage = await this.authProvider.verifyOtp(this.signupForm.controls.contact.value, this.otp);
      //todo add a toaster here respMessage
      this.loaderProvider.hideLoader();
    } catch (error) {
      this.loaderProvider.hideLoader();
    }
  }

  async resendOtp(resend: boolean = true) {
    try {
      this.loaderProvider.showLoader("");
      let respMessage = await this.authProvider.sendOtp(this.signupForm.controls.contact.value, true);
      //todo add a toaster here respMessage
      this.loaderProvider.hideLoader();
    } catch (error) {
      this.loaderProvider.hideLoader();
    }
  }

  switchToSignIn() {
    console.log("signup clicked");
    this.component.next("signin");
  }
}
