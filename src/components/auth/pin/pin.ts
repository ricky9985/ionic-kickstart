import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthProvider} from "../../../providers/auth/auth";

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Output() component = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Input() data = new EventEmitter();

  dataLoaded: boolean = false;
  pinSet: boolean;
  setPin1: string = '';
  setPin2: string = '';

  constructor(private authProvider: AuthProvider) {
    console.log('Hello PinComponent Component');
  }

  async setPin() {
    try {
      await this.authProvider.setPin(this.setPin1);
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }

  async getPin() {
    console.log(this.setPin2);
    try {
      if (this.setPin2.length === 4) {
        await this.authProvider.pinLogin(this.setPin2);
      }
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }
}
