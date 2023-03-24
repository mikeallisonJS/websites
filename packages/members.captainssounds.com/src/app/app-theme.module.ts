import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from 'ngx-flexible-layout'
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
    ScrollingModule
  ],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
    ScrollingModule
  ]
})
export class AppThemeModule {}
