import { Component, inject } from '@angular/core'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { intersection } from 'lodash-es'
import { filter } from 'rxjs'

import { AuthService } from '../auth.service'
import { Product } from '../product/product.interface'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  firestore: Firestore = inject(Firestore)
  categories = ['effect racks', 'instruments', 'samples', 'templates']
  selectedCategory: string
  products: Product[] = []
  selectedProduct: Product | null = null
  constructor(
    router: Router,
    private route: ActivatedRoute,
    protected authService: AuthService
  ) {
    this.setParams()
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setParams()
      })
    const aCollection = collection(this.firestore, 'products')
    collectionData(aCollection, {
      idField: 'id'
    }).subscribe((products) => {
      this.products = products as Product[]
      this.setParams()
    })
  }
  setParams(): void {
    this.selectedCategory =
      this.route?.snapshot.paramMap.get('category') || 'effect racks'
    const selectedProductId =
      this.route?.snapshot.paramMap.get('id') || undefined
    this.selectedProduct =
      this.products.find(({ id }) => id === selectedProductId) || null
  }
  ownsProduct(product: Product): boolean {
    return (
      intersection(this.authService.userData.products, [
        product,
        'ultimate-ableton-templates'
      ]).length > 0 || product.free
    )
  }
}
