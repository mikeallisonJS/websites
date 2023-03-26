import { NgModule } from '@angular/core'
import { SpecialOfferComponent } from './special-offer.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [SpecialOfferComponent],
  imports: [AppThemeModule],
  exports: [SpecialOfferComponent]
})
export class SpecialOfferModule {}
