import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class AppDataProvider {

  constructor(public storage: Storage) {
    console.log('Hello LocalStorageProvider Provider');
  }


}
