import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {IonicStorageModule} from "@ionic/storage";

import {MyApp} from './app.component';
import {AuthPage} from "../pages/auth/auth";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SigninComponent} from "../components/auth/signin/signin";
import {SignupComponent} from "../components/auth/signup/signup";
import {AuthProvider} from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    SignupComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {
}
