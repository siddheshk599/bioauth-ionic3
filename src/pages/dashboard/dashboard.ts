import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SettersandgettersProvider } from '../../providers/settersandgetters/settersandgetters';
import { LoginpagePage } from '../loginpage/loginpage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  data = { name: "" }

  constructor(public navCtrl: NavController, public navParams: NavParams, public setAndGet: SettersandgettersProvider, public toastCtrl: ToastController) {
    console.log(this.setAndGet.UserName)
    this.data.name = this.setAndGet.UserName;
  }

  ngOnInit() {
    const toast = this.toastCtrl.create({
      message: 'Welcome user!',
      duration: 3000
    });
    toast.present();
  }

  logout() {
    this.navCtrl.setRoot(LoginpagePage);
    const toast = this.toastCtrl.create({
      message: 'Logged out successfully!',
      duration: 3000
    });
    toast.present()
  }

}
