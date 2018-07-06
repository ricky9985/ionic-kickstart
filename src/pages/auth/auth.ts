import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {SigninComponent} from "../../components/auth/signin/signin";
import {SignupComponent} from "../../components/auth/signup/signup";

// @IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  title: string;
  componentRef: any;
  @ViewChild('messagecontainer', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private componentFactoryResolver: ComponentFactoryResolver) {
    this.title = "auth";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.loadComponent();
  }

  loadComponent() {
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(SigninComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.text = "I am loaded dynamically";
    // this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    // let adItem = this.ads[this.currentAdIndex];
    //
    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    //
    // let viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    //
    // let componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data;
    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SigninComponent);

  }


}
