import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AppThemeModule } from '../app-theme.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, AppThemeModule, HttpClientModule, ReactiveFormsModule]
})
export class RegisterModule {}
