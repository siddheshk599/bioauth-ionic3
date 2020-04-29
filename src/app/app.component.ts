import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginpagePage } from '../pages/loginpage/loginpage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginpagePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }
}