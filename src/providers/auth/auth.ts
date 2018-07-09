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

}
