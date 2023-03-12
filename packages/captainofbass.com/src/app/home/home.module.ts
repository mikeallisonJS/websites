import { NgModule } from '@angular/core'
import { MatDividerModule } from '@angular/material/divider'
import { BioModule } from './bio/bio.module'
import { HomeComponent } from './home.component'
import { PastEventsModule } from './past-events/past-events.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [MatDividerModule, BioModule, PastEventsModule],
  exports: [HomeComponent]
})
export class HomeModule {}
