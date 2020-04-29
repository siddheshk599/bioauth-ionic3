import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility'
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { SettersandgettersProvider } from '../../providers/settersandgetters/settersandgetters';
import { LockScreenComponent } from 'ionic-simple-lockscreen';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { NoInternetPage } from '../no-internet/no-internet';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public utility: UtilityProvider, public faio: FingerprintAIO, public setAndGet: SettersandgettersProvider, private storage: Storage, private toastCtrl: ToastController, private alertCtrl: AlertController, public app: App, public network: Network){
    
  }

  ionViewWillEnter() {
    this.isOffline();
  }

  isOffline() {
    if(!navigator.onLine) {
      this.navCtrl.push(NoInternetPage);
      this.navCtrl.setRoot(NoInternetPage);
    }
  }

  data = {
    userName: ""
  }

  login(text){
    if(text === "fingerprint") {
      if (!this.data.userName)
    {
      this.utility.presentAlert("Please enter your name!");
      return;            
    }
    else {
    this.faio.isAvailable()
    .then(result => {
      console.log(result);
      if(result === "finger"){
        console.log("Fingerprint Authentication exists!")
        this.faio.show({
          clientId: 'DemoAuthenticationApp',
          clientSecret: 'demoAuthenticationApp',
          disableBackup: true,
          localizedFallbackTitle: 'Use Pin',
          localizedReason: 'Please Authenticate'
        })
        .then(() => {
          this.setAndGet.UserName = this.data.userName;
          this.navCtrl.setRoot("DashboardPage")
          })
        .catch((error: any) => {   
          this.utility.presentAlert(error);
          console.log(error);
        });
      }
      else {      
        this.utility.presentAlert("Fingerprint Authentication is not available on this device!");
        console.log("Fingerprint Authentication is not available on this device!")
      }
    })
    }
    }
    else if (text === "pin"){
      if (!this.data.userName)
      {
        this.utility.presentAlert("Please enter your name!");
        return;            
      }
      else {
          this.storage.get('passcode').then(code => {
            if (!code) {
              this.setupCode();
            }
            else {
              this.setAndGet.UserName = this.data.userName;
                  this.navCtrl.setRoot(DashboardPage)
              this.navCtrl.push(LockScreenComponent, {
                code: code,
                ACDelButtons: false,
                passcodeLabel: 'Unlock App',
                onCorrect: () => {
                  let toast = this.toastCtrl.create({
                    message: 'App unlocked',
                    duration: 3000
                  });
                  toast.present();
                },
                onWrong: (attempts) => {
                  let toast = this.toastCtrl.create({
                    message: `${attempts} wrong possible attempt(s)`,
                    duration: 2000
                  });
                  toast.present();
                }
              });
            }
          });
        }
      
      }
    
  }

  setupCode() {
    let alert = this.alertCtrl.create({
      title: 'Secure your app',
      message: 'Please set your PIN for this app',
      inputs: [{
        name: 'code'
      }],
      buttons: [{
        text: 'Set PIN',
        handler: data => {
          if (data.code.length < 4) {
            return false;
          }
          else {
            this.storage.set('passcode', data.code);
            return true;
          }

        }
      }]
    });
    alert.present();
  }

}