import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LinksComponent } from './links/links.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MusicComponent } from './music/music.component'
import { EpkComponent } from './epk/epk.component'
import { DonateComponent } from './donate/donate.component'
import { ShopComponent } from './shop/shop.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'music', component: MusicComponent },
  { path: 'links', component: LinksComponent },
  { path: 'epk', component: EpkComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'shop', component: ShopComponent }
]

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
