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
import {AuthProvider} from "../../providers/auth/auth";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private componentFactoryResolver: ComponentFactoryResolver, private authProvider :AuthProvider) {
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
    });
    this.componentRef.instance.dataForm.subscribe(value=>{
      this.handleUserInteractionData(value);
    })
  }

  destroyComponent() {
    this.componentRef.instance.component.unsubscribe();
    this.componentRef.instance.dataForm.unsubscribe();
    this.componentRef.destroy();
  }

  async handleUserInteractionData(data) {
    console.log("hello");

  }
}
