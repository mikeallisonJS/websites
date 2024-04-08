import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from 'ngx-flexible-layout'
import { AppThemeModule } from '../app-theme.module'
import { HeaderComponent } from './header.component'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppThemeModule, FlexLayoutModule],
  exports: [HeaderComponent]
})
export class HeaderModule {}
