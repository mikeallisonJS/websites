import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { SpecialOfferComponent } from './special-offer/special-offer.component'

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'special-offer',
    component: SpecialOfferComponent
  }
]
