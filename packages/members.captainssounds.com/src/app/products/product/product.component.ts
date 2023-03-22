import { Component, Input } from '@angular/core'
import { Product } from './product.interface'

@Component({
  selector: 'app-product[product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  selectedImage = 0
  @Input() product: Product
}
