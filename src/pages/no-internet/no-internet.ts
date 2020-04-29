import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';

@IonicPage()
@Component({
  selector: 'page-no-internet',
  templateUrl: 'no-internet.html',
})
export class NoInternetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public onlineOffline: boolean = navigator.onLine;

  checkInternet() {
    if(!this.onlineOffline) {
      this.navCtrl.setRoot(LoginpagePage); 
    }
    else {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
  }

}
