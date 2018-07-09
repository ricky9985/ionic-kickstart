import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable()
export class LocalStorageProvider {

  constructor(public storage: Storage) {
    console.log('Hello LocalStorageProvider Provider');
  }

  async setKey(key, value) {
    return this.storage.set(key, value);
  }

  async getKey(key) {
    return this.storage.get(key);
  }

}
