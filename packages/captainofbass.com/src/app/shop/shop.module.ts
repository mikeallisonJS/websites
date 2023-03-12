import { NgModule } from '@angular/core'
import { ShopComponent } from './shop.component'
import { ProductsModule } from './products/products.module'
import { MatSidenavModule } from '@angular/material/sidenav'
import { DrawerModule } from './drawer/drawer.module'

@NgModule({
  declarations: [ShopComponent],
  imports: [ProductsModule, MatSidenavModule, DrawerModule],
  exports: [ShopComponent]
})
export class ShopModule {}
