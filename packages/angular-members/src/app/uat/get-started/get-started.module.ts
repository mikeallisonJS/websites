import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GetStartedComponent } from './get-started.component'

import { AppThemeModule } from '../../app-theme.module'

@NgModule({
  declarations: [GetStartedComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [GetStartedComponent]
})
export class GetStartedModule {}
