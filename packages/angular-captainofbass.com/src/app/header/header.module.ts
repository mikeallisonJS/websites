import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from 'ngx-flexible-layout'
import { HeaderComponent } from './header.component'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatToolbarModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
