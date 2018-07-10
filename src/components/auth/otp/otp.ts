import { Component } from '@angular/core';

/**
 * Generated class for the OtpComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'otp',
  templateUrl: 'otp.html'
})
export class OtpComponent {

  text: string;

  constructor() {
    console.log('Hello OtpComponent Component');
    this.text = 'Hello World';
  }

}
