import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductComponent } from './product.component'
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule } from 'apollo-angular'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ApolloModule, HttpClientModule, MatSelectModule],
  exports: [ProductComponent]
})
export class ProductModule {}
