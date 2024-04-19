import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppThemeModule } from '../app-theme.module'

import { ProductComponent } from './product.component'

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [ProductComponent]
})
export class ProductModule {}
