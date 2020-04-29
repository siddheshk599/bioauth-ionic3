import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
@Injectable()
export class UtilityProvider {

  constructor(public alertCtrl: AlertController) {
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
