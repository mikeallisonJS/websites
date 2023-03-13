import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [HomeComponent]
})
export class HomeModule {}
