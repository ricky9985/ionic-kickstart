import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthProvider} from "../../../providers/auth/auth";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent implements OnInit {
  @Output() component = new Subject();
  @Output() nextPage = new Subject();
  @Input() data: boolean;

  setPin1: string = '';
  setPin2: string = '';

  constructor(private authProvider: AuthProvider) {
    console.log('Hello PinComponent Component');
  }

  ngOnInit() {
    console.log(this.data);
  }

  async setPin() {
    try {
      if (this.setPin1 === this.setPin2) {
        await this.authProvider.setPin(this.setPin1);
        this.nextPage.next("Landing Page");
      } else {
        //todo add a toaster for pin mismatch
      }
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }

  async checkPin() {
    console.log(this.setPin2);
    try {
      if (this.setPin2.length === 4) {
        await this.authProvider.pinLogin(this.setPin2);
        this.nextPage.next("Landing Page");
      }
    } catch (error) {
      //todo display error is toaster
      console.log(error);
    }
  }
}
