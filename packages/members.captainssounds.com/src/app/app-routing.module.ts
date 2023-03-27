import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LinksComponent } from './links/links.component'
import { RegisterComponent } from './register/register.component'
import { ProductsComponent } from './products/products.component'
import { UatComponent } from './uat/uat.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
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
    component: LinksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private authService: AuthService) {}
}
