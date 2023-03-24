import { Component, Input } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { Product } from './product.interface'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(protected sanitizer: DomSanitizer) {}
  selectedImage = 0
  @Input() product: Product
}
