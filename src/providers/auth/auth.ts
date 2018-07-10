import {Injectable} from '@angular/core';
import {HttpProvider} from '../http/http';
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthProvider {

  constructor(private httpProvider: HttpProvider, public storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  async login(formData) {
    try {
      //todo: check if online
      console.log(formData);
      let loginUrl = "auth/user/login?device=app";
      let response = await this.httpProvider.postReq(loginUrl, formData);
      console.log(response);
      this.httpProvider.token = response['token'];
      await this.storage.set('token', response['token']);
      await this.storage.set('gstin', response['userData']['gstinList'][0]);
      return Promise.resolve(response['userData']['data']['firstName']);
    } catch (error) {
      console.log(error);
      //todo: give appropriate error
      return Promise.reject("Invalid Credentials");
    }
  }

  async pinLogin(enteredPin) {
    try {
      console.log(enteredPin);
      let pin = await this.storage.get("pin");
      if (enteredPin === pin) {
        return Promise.resolve({status: true, message: "Logged in."});
      } else {
        return Promise.reject({status: false, message: "Incorrect pin."});
      }
    } catch (error) {
      return Promise.reject({status: false, message: "Cannot login."})
    }
  }

  async setPin(pin: string) {
    try {
      await this.storage.set("pin", pin);
      return Promise.resolve({status: true, message: "Pin set"});
    } catch (error) {
      return Promise.reject({status: false, message: "Cannot set Pin."});
    }
  }

  async isPinSet() {
    let pin = await this.storage.get("pin");
    if (pin) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  async clearPin() {
    await this.storage.remove("pin");
  }

  async sendOtp(contact: number, resend: boolean = false) {
    try {
      let url = "service/sendOtp?mobile=" + contact;
      if (resend) {
        url += "&resend=true";
      }
      let res = await this.httpProvider.getReq(url);
      if (res['status']) {
        return Promise.resolve("OTP sent.")
      } else {
        return Promise.reject("Unable to send OTP.");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async verifyOtp(contact: number, otp: number) {
    try {
      let url = "service/verifyOtp?mobile=" + contact + "&otp=" + otp;
      let res = await this.httpProvider.getReq(url);
      if (res['status']) {
        return Promise.resolve(res["message"])
      } else {
        return Promise.reject(res["message"]);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signUp(signUpForm) {
    console.log("signing up");
  }
}
