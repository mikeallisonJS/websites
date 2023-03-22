import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { ProductsComponent } from './products.component'
import { AppThemeModule } from '../app-theme.module'
import { ProductComponent } from './product/product.component'

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [CommonModule, AppThemeModule, NgPipesModule],
  exports: [ProductsComponent]
})
export class ProductsModule {}
