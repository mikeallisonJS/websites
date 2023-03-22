import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UatComponent } from './uat.component'
import { UatRoutingModule } from './uat-routing.module'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [UatComponent],
  imports: [CommonModule, AppThemeModule, UatRoutingModule],
  exports: [UatComponent]
})
export class UatModule {}
