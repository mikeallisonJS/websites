import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccountComponent } from './account.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AppThemeModule]
})
export class AccountModule {}
