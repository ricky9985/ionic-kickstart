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
  template: `
    <ion-content>
      <template #messagecontainer>
      </template>
    </ion-content>`
})
export class AuthPage {
  title: string;
  componentRef: ComponentRef<any>;
  @ViewChild('messagecontainer', {read: ViewContainerRef}) entry: ViewContainerRef;


  constructor(public navCtrl: NavController, public navParams: NavParams, private componentFactoryResolver: ComponentFactoryResolver, authProvider: AuthProvider) {
    this.title = "auth";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.authProvider.isPinSet().then(status => {
      status ? this.loadComponent("pin", status) : this.loadComponent("signin", "");
    });
    // this.loadComponent("signup", false);
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
      console.log(value);
      //todo uncomment below lines to enable navigation
      // this.navCtrl.setRoot(value);
      // this.destroyComponent();
    })
  }

  destroyComponent() {
    this.componentRef.instance.component.unsubscribe();
    this.componentRef.destroy();
  }

}
