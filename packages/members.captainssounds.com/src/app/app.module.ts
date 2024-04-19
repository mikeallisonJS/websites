import { NgModule } from '@angular/core'
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService
} from '@angular/fire/analytics'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { FIREBASE_OPTIONS } from '@angular/fire/compat'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator
} from '@angular/fire/functions'
import { BrowserModule } from '@angular/platform-browser'

import { environment } from '../environments/environment'

import { AccountModule } from './account/account.module'
import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppThemeModule } from './app-theme.module'
import { AppComponent } from './app.component'
import { AuthService } from './auth.service'
import { ForgotPasswordModule } from './forgot-password/forgot-password.module'
import { HeaderModule } from './header/header.module'
import { LinksModule } from './links/links.module'
import { LoginModule } from './login/login.module'
import { ProductsModule } from './products/products.module'
import { RegisterModule } from './register/register.module'
import { UatModule } from './uat/uat.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AccountModule,
    AdminModule,
    ForgotPasswordModule,
    HeaderModule,
    LinksModule,
    LoginModule,
    RegisterModule,
    UatModule,
    ProductsModule,
    AppRoutingModule,
    AppThemeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => {
      const functions = getFunctions()
      if (!environment.production)
        connectFunctionsEmulator(functions, 'localhost', 5001)
      return functions
    })
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
