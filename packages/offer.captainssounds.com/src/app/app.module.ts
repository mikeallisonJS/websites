import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
// import {
//   provideAnalytics,
//   getAnalytics,
//   ScreenTrackingService,
//   UserTrackingService
// } from '@angular/fire/analytics'
// import { provideFunctions, getFunctions } from '@angular/fire/functions'

import { AppComponent } from './app.component'
import { appRoutes } from './app.routes'
import { HomeModule } from './home/home.module'
import { SpecialOfferModule } from './special-offer/special-offer.module'
import { AppThemeModule } from './app-theme.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatToolbarModule,
    HomeModule,
    SpecialOfferModule,
    RouterModule.forRoot(appRoutes),
    AppThemeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase))
    // provideAnalytics(() => getAnalytics())
    // provideFunctions(() => getFunctions())
  ],
  // providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
