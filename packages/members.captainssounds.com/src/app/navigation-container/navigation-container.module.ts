import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../app-theme.module'

import { NavigationContainerComponent } from './navigation-container.component'

@NgModule({
  declarations: [NavigationContainerComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [NavigationContainerComponent]
})
export class NavigationContainerModule {}
