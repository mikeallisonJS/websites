import { NgModule } from '@angular/core'
import { PastEventsComponent } from './past-events.component'
import { AppThemeModule } from '../../app-theme.module'

@NgModule({
  declarations: [PastEventsComponent],
  imports: [AppThemeModule],
  exports: [PastEventsComponent]
})
export class PastEventsModule {}
