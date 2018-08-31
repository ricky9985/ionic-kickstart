import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) {
    console.log('Hello ToastProvider Provider');
  }

  duration: number = 2750;

  async presentToast(message, type) {
    console.log("toaster");
    let className = {
      "error": "toast-error",
      "success": "toast-success",
      "info": "toast-info"
    };
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: this.duration,
      showCloseButton: true,
      dismissOnPageChange: true,
      cssClass: className[type]
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      return "dismissed";
    });

    return toast.present();
  }

}
