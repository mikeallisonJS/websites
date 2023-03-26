import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routes'
import { HomeModule } from './home/home.module'
import { SpecialOfferModule } from './special-offer/special-offer.module'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { AppThemeModule } from './app-theme.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatToolbarModule,
    HomeModule,
    SpecialOfferModule,
    RouterModule.forRoot(appRoutes),
    AppThemeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
