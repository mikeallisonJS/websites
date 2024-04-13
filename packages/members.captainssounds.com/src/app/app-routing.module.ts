import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AccountComponent } from './account/account.component'
import { AdminComponent } from './admin/admin.component'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LinksComponent } from './links/links.component'
import { LoginComponent } from './login/login.component'
import { ProductsComponent } from './products/products.component'
import { RegisterComponent } from './register/register.component'
import { UatComponent } from './uat/uat.component'

const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent
  },
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
    path: 'forgot-password',
    component: ForgotPasswordComponent
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
