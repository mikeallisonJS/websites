import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ForgotPasswordComponent } from './forgot-password.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [AppThemeModule, ReactiveFormsModule]
})
export class ForgotPasswordModule {}
