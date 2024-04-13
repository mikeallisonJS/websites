import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NgPipesModule } from 'ngx-pipes'

import { AppThemeModule } from '../app-theme.module'
import { NavigationContainerModule } from '../navigation-container/navigation-container.module'
import { ProductModule } from '../product/product.module'

import { ProductsComponent } from './products.component'

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    AppThemeModule,
    NgPipesModule,
    NavigationContainerModule,
    ProductModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule {}
