import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DrawerComponent } from './drawer.component'
import { ProductModule } from './product/product.module'

@NgModule({
  declarations: [DrawerComponent],
  imports: [CommonModule, ProductModule],
  exports: [DrawerComponent]
})
export class DrawerModule {}
