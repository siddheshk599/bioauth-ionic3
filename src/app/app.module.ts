import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettersandgettersProvider } from '../providers/settersandgetters/settersandgetters';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { UtilityProvider } from '../providers/utility/utility';
import { IonicStorageModule } from '@ionic/storage';
import { LockScreenModule, LockScreenComponent } from 'ionic-simple-lockscreen';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { NoInternetPageModule } from '../pages/no-internet/no-internet.module';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    LoginpagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LockScreenModule,
    DashboardPageModule,
    NoInternetPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LockScreenComponent,
    LoginpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettersandgettersProvider,
    FingerprintAIO,
    UtilityProvider,
    Network
  ]
})
export class AppModule {}
