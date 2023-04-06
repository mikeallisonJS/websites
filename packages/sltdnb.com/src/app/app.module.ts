import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routes'
import { HeaderModule } from './header/header.module'
import { AppThemeModule } from './app-theme.module'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics'
import { HomeModule } from './home/home.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppThemeModule,
    HeaderModule,
    HomeModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics())
  ],
  // providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
