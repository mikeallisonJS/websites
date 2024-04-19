import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppThemeModule } from '../app-theme.module'

import { ForgotPasswordComponent } from './forgot-password.component'

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [AppThemeModule, ReactiveFormsModule]
})
export class ForgotPasswordModule {}
