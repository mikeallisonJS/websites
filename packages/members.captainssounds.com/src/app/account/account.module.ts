import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../app-theme.module'

import { AccountComponent } from './account.component'

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AppThemeModule]
})
export class AccountModule {}
