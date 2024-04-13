import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../../app-theme.module'

import { GetStartedComponent } from './get-started.component'

@NgModule({
  declarations: [GetStartedComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [GetStartedComponent]
})
export class GetStartedModule {}
