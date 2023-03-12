import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router'
import { MobileNavComponent } from './mobile-nav.component'

@NgModule({
  declarations: [MobileNavComponent],
  imports: [MatListModule, RouterModule],
  exports: [MobileNavComponent]
})
export class MobileNavModule {}
