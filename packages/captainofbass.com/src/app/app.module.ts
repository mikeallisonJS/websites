import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSliderModule } from '@angular/material/slider'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { FlexLayoutModule } from 'ngx-flexible-layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CommonModule } from '@angular/common'
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics'
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment'
import { LinksModule } from './links/links.module'
import { DonateModule } from './donate/donate.module'
import { MobileNavModule } from './mobile-nav/mobile-nav.module'
import { HeaderModule } from './header/header.module'
import { PlayerModule } from './player/player.module'
import { HomeModule } from './home/home.module'
import { EpkModule } from './epk/epk.module'
import { MusicModule } from './music/music.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    PlayerModule,
    DonateModule,
    EpkModule,
    FlexLayoutModule,
    HeaderModule,
    HomeModule,
    LinksModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MobileNavModule,
    MusicModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
