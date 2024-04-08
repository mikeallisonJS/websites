import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { ProductsComponent } from './products.component'
import { AppThemeModule } from '../app-theme.module'
import { NavigationContainerModule } from '../navigation-container/navigation-container.module'
import { ProductModule } from '../product/product.module'

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
