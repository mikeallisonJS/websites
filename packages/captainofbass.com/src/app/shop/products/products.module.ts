import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { GraphQLModule } from '../graphql.module'
import { ProductsComponent } from './products.component'
import { ProductModule } from './product/product.module'
import { FlexLayoutModule } from 'ngx-flexible-layout'

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    GraphQLModule,
    HttpClientModule,
    ProductModule,
    FlexLayoutModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule {}
