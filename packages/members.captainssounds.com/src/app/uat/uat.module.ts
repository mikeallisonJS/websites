import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../app-theme.module'

import { UatRoutingModule } from './uat-routing.module'
import { UatComponent } from './uat.component'

@NgModule({
  declarations: [UatComponent],
  imports: [CommonModule, AppThemeModule, UatRoutingModule],
  exports: [UatComponent]
})
export class UatModule {}
