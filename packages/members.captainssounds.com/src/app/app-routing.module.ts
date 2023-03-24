import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LinksComponent } from './links/links.component'
import { RegisterComponent } from './register/register.component'
import { ProductsComponent } from './products/products.component'
import { UatComponent } from './uat/uat.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'uat',
    component: UatComponent
  },
  {
    path: 'links',
    component: LinksComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
