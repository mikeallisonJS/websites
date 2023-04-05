import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routes'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderModule } from './header/header.module'
import { AppThemeModule } from './app-theme.module'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppThemeModule,
    HeaderModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics())
  ],
  // providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
