import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppThemeModule } from '../app-theme.module'

import { RegisterComponent } from './register.component'

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, AppThemeModule, HttpClientModule, ReactiveFormsModule]
})
export class RegisterModule {}
