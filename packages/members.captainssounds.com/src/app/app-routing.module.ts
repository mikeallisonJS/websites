import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { OfferComponent } from './offer/offer.component'
import { ProductsComponent } from './products/products.component'
import { UatComponent } from './uat/uat.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'offer',
    component: OfferComponent
  },
  {
    path: 'uat',
    component: UatComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
