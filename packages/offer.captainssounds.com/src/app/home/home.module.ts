import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [AppThemeModule],
  exports: [HomeComponent]
})
export class HomeModule {}
