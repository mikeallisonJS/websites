import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { Product } from '../product/product.interface'

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent {
  @Input() categories: string[]
  @Input() selectedItem: Product | null = null
  @Input() selectedCategory: string
  constructor(protected router: Router) {}
}
