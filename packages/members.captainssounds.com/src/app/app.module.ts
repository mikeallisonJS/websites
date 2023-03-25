import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService
} from '@angular/fire/analytics'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { HeaderModule } from './header/header.module'
import { RegisterModule } from './register/register.module'
import { UatModule } from './uat/uat.module'
import { AppThemeModule } from './app-theme.module'
import { ProductsModule } from './products/products.module'
import { LinksModule } from './links/links.module'
import { SpecialOfferModule } from './special-offer/special-offer.module'
import { LoginModule } from './login/login.module'
import { AuthService } from './auth.service'
import { FIREBASE_OPTIONS } from '@angular/fire/compat'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderModule,
    LinksModule,
    LoginModule,
    RegisterModule,
    UatModule,
    SpecialOfferModule,
    ProductsModule,
    AppRoutingModule,
    AppThemeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
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
