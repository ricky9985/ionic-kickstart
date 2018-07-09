import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {
  @Output() component = new EventEmitter();
  text: string;

  constructor() {
    console.log('Hello PinComponent Component');
    this.text = 'Hello World';
  }

  async setPin() {
    try {
      await this.loginProvider.setPin(this.setPin1);
      this.navCtrl.setRoot("DashboardPage");
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }

  async getPin() {
    console.log(this.setPin2);
    try {
      if (this.setPin2.length === 4) {
        await this.loginProvider.pinLogin(this.setPin2);
        this.navCtrl.setRoot("DashboardPage");
      }
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }
}
