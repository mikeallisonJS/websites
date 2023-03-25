import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpecialOfferComponent } from './special-offer.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [SpecialOfferComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [SpecialOfferComponent]
})
export class SpecialOfferModule {}
