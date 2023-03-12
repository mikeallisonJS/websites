import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { ProductComponent } from './product.component'

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, MatCardModule],
  exports: [ProductComponent]
})
export class ProductModule {}
