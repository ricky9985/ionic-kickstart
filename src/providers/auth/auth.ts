import {Injectable} from '@angular/core';
import {HttpProvider} from '../http/http';
import {LocalStorageProvider} from "../storage/localStorage";

@Injectable()
export class AuthProvider {

  constructor(private httpProvider: HttpProvider, public localStorageProvider: LocalStorageProvider ) {
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
      await this.localStorageProvider.setKey('token', response['token']);
      await this.localStorageProvider.setKey('gstin', response['userData']['gstinList'][0]);
      return Promise.resolve(response['userData']['data']['firstName']);
    } catch (e) {
      //todo: give appropriate error
      return Promise.reject("Invalid Credentials");
    }
  }

}
