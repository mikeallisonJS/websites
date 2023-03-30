import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'
import { AppThemeModule } from '../app-theme.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AppThemeModule, ReactiveFormsModule],
  exports: [LoginComponent]
})
export class LoginModule {}
