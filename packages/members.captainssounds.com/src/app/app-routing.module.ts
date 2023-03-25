import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LinksComponent } from './links/links.component'
import { RegisterComponent } from './register/register.component'
import { ProductsComponent } from './products/products.component'
import { UatComponent } from './uat/uat.component'
import { SpecialOfferComponent } from './special-offer/special-offer.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'uat',
    component: UatComponent
  },
  {
    path: 'links',
    component: LinksComponent
  },
  {
    path: 'special-offer',
    component: SpecialOfferComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
