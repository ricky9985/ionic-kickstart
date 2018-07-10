import {LoadingController, Loading} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class LoaderProvider {
  loader: Loading;

  constructor(
    private loadingCtrl: LoadingController) {
    console.log('Hello LoaderProvider Provider');
  }

  showLoader(message) {
    if (this.loader == null) {
      this.loader = this.loadingCtrl.create({
        content: message,
        cssClass:"loader"
      });
      this.loader.present();
    } else {
      this.loader.data.content = message;
    }
  }

  hideLoader() {
    try {
      if (this.loader != null) {
        this.loader.dismiss();
        this.loader = null;
      }
    } catch (error) {
      // this.loggerProvider.error(error);
      console.log("already dismissed.")
    }
  }

  // public showCommonLoader() {
  //     console.log("calling commonLoader");
  //     this.showLoadingHandler(new Messages().getMessage("pleaseWait"));
  // }

  // public showLoader(message) {
  //     this.showLoadingHandler(message);
  // }
}
