import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

const remoteUrl = 'https://biz.dev.coniferlabs.in:4001/';

@Injectable()
export class HttpProvider {
  public token: string = null;

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
    // this.remoteUrl = ENV['remoteUrl'];

    console.log(remoteUrl);
  }

  async getReq(subUrl: string) {
    return new Promise((resolve, reject) => {
      console.log('in get req');
      let headers = new HttpHeaders();
      if (this.token != null)
        headers = headers.set('x-access-token', this.token);
      let url = remoteUrl + subUrl;
      this.http.get(url, {headers: headers}).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        });
    })
  }

  async postReq(subUrl: string, body: any = {}) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      if (this.token != null)
        headers = headers.set('x-access-token', this.token);
      let url = remoteUrl + subUrl;
      this.http.post(url, body, {headers: headers}).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        error => {
          console.log(error);
          reject(error);
        });
    })
  }
}
