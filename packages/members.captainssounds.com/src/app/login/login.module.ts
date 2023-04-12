import { NgModule } from '@angular/core'
import { LoginComponent } from './login.component'
import { AppThemeModule } from '../app-theme.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [AppThemeModule, ReactiveFormsModule],
  exports: [LoginComponent]
})
export class LoginModule {}
