import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'
import { HttpClientModule } from '@angular/common/http'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [HttpClientModule, AppThemeModule],
  exports: [HomeComponent]
})
export class HomeModule {}
