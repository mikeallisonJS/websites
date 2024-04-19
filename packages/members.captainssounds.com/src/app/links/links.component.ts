import { Component, inject } from '@angular/core'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

import { Product } from '../product/product.interface'

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  firestore: Firestore = inject(Firestore)
  categories = ['bonus content']
  selectedCategory: string
  products: Product[] = []
  selectedProduct: Product | null = null
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setParams()
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setParams()
      })
    const aCollection = collection(this.firestore, 'links')
    collectionData(aCollection, {
      idField: 'id'
    }).subscribe((products) => {
      this.products = products as Product[]
      this.setParams()
    })
  }
  setParams(): void {
    this.selectedCategory =
      this.route?.snapshot.paramMap.get('category') || 'bonus content'
    const selectedProductId =
      this.route?.snapshot.paramMap.get('id') || undefined
    this.selectedProduct =
      this.products.find(({ id }) => id === selectedProductId) || null
  }
}
