import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from './app.component';
import {AuthPage} from "../pages/auth/auth";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {SigninComponent} from "../components/auth/signin/signin";
import {SignupComponent} from "../components/auth/signup/signup";
import {PinComponent} from "../components/auth/pin/pin";
import {AuthProvider} from '../providers/auth/auth';
import {HttpProvider} from "../providers/http/http";
import { ToasterProvider } from '../providers/toaster/toaster';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    SigninComponent,
    SignupComponent,
    PinComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name : '_localStorage',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    SigninComponent,
    SignupComponent,
    PinComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpProvider,
    ToasterProvider
  ]
})
export class AppModule {
}
