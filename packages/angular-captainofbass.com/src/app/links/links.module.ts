import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from '../app-routing.module'
import { LinksComponent } from './links.component'

@NgModule({
  declarations: [LinksComponent],
  imports: [FontAwesomeModule, AppRoutingModule, MatListModule],
  exports: [LinksComponent]
})
export class LinksModule {}
