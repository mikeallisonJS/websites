import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'
import { PastEventsModule } from './past-events/past-events.module'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [AppThemeModule, PastEventsModule],
  exports: [HomeComponent]
})
export class HomeModule {}
