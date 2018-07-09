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
import {PinComponent} from "../../components/auth/pin/pin";
import {AuthProvider} from "../../providers/auth/auth";

const AuthMethods: Object = {
  signin: SigninComponent,
  signup: SignupComponent,
  pin: PinComponent
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private componentFactoryResolver: ComponentFactoryResolver, private authProvider: AuthProvider) {
    this.title = "auth";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.authProvider.isPinSet().then(data => {
      data.status ? this.loadComponent("pin", data.data) : this.loadComponent("signin", "");
    });
  }

  loadComponent(componentName, componentValue) {
    console.log("loading component: ", componentName);
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(AuthMethods[componentName]);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.data = componentValue;
    console.log(this.componentRef);
    this.subscribeChange();
  }

  subscribeChange() {
    this.componentRef.instance.component.subscribe(value => {
      console.log(value);
      this.destroyComponent();
      this.loadComponent(value, "");
    });
    this.componentRef.instance.nextPage.subscribe(value => {
      this.navCtrl.setRoot(value);
      this.destroyComponent();
    })
  }

  destroyComponent() {
    this.componentRef.instance.component.unsubscribe();
    this.componentRef.destroy();
  }
}
