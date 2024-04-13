import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppThemeModule } from '../app-theme.module'

import { LoginComponent } from './login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [AppThemeModule, ReactiveFormsModule],
  exports: [LoginComponent]
})
export class LoginModule {}
