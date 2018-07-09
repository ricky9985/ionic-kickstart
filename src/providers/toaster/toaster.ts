import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ToasterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ToasterProvider Provider');
  }

}
