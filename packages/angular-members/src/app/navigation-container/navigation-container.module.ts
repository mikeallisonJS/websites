import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationContainerComponent } from './navigation-container.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [NavigationContainerComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [NavigationContainerComponent]
})
export class NavigationContainerModule {}
