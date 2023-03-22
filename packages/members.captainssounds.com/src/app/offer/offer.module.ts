import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OfferComponent } from './offer.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [OfferComponent],
  imports: [CommonModule, AppThemeModule, ReactiveFormsModule]
})
export class OfferModule {}
