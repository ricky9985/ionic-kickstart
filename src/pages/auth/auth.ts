import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SigninComponent} from "../../components/auth/signin/signin";
import {SignupComponent} from "../../components/auth/signup/signup";

const AuthMethods: Object = {
  signin: SigninComponent,
  signup: SignupComponent
};

// @IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  title: string;
  componentRef: ComponentRef<any>;
  @ViewChild('messagecontainer', {read: ViewContainerRef}) entry: ViewContainerRef;


  constructor(public navCtrl: NavController, public navParams: NavParams, private componentFactoryResolver: ComponentFactoryResolver) {
    this.title = "auth";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.loadComponent("signin");
  }

  loadComponent(value) {
    console.log("loading component: ", value);
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(AuthMethods[value]);
    this.componentRef = this.entry.createComponent(factory);
    console.log(this.componentRef);
    this.subscribeChange();
  }

  subscribeChange() {
    this.componentRef.instance.component.subscribe(value => {
      console.log(value);
      this.destroyComponent();
      this.loadComponent(value);
    })
  }

  destroyComponent() {
    this.componentRef.instance.component.unsubscribe();
    this.componentRef.destroy();
  }

  changeComponent(ev) {
    console.log("hello");
    console.log(ev);
  }
}
