import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
