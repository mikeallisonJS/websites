import { Component, Input } from '@angular/core'
import { ShopService } from '../../shop.service'

@Component({
  selector: 'app-shop-products-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any
  constructor(protected shopService: ShopService) {}
  select() {
    this.shopService.selectedProductId = this.product.id
  }
}
