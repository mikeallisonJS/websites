import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductComponent } from './product.component'
import { AppThemeModule } from '../app-theme.module'

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, AppThemeModule],
  exports: [ProductComponent]
})
export class ProductModule {}
