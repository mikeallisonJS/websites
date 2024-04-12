'use client'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { ReactElement, useState } from 'react'

import { useFirestore, useDatabaseListData, useDatabase } from 'reactfire'
import { ref, query } from '@firebase/database'

const categories = [
  'effect racks',
  'instruments',
  'samples',
  'templates'
] as const

interface ProductImage {
  url: string
  compressedName: string
}

export interface Product {
  id: string
  name: string
  description: string
  images: ProductImage[]
  free: boolean
  purchaseUrl: string
}

export default function ProductPageClient(): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const database = useDatabase()
  const productsRef = ref(database, 'products')
  const productsQuery = query(productsRef)
  const { status, data } = useDatabaseListData(productsQuery, {
    idField: 'id'
  })

  return (
    <>
      {/* <Drawer 
  // <app-product
  //   detail
  //   *ngIf="selectedProduct !== null"
  //   [product]="selectedProduct"
  //   /> */}
      <Grid container spacing={2}>
        {data?.map((product: Product) => (
          <Grid item xs={6} md={3} key={product.id}>
            <Card>
              <CardHeader title={product.name} />
              <CardContent>{product.description}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <mat-card
    list
    class="product-card"
    *ngFor="let product of products | filterBy: ['category'] : selectedCategory"
  >
    <a [routerLink]="[{ id: product.id, category: selectedCategory }]">
      <mat-icon
        fontIcon="done"
        *ngIf="product && ownsProduct(product)"
        color="primary"
        style="
          position: absolute;
          z-index: 5;
          font-size: 48px;
          height: 48px;
          width: 48px;
          margin-left: 8px;
        "
      />
      <picture mat-card-image *ngIf="product.images[0]">
        <source
          srcset="
            /assets/compressed/products/{{product.images[0].compressedName}}-256.webp
          "
          media="(max-width: 512px)"
          type="image/webp"
        />
        <source
          srcset="
            /assets/compressed/products/{{product.images[0].compressedName}}-512.webp
          "
          media="(max-width: 1024px)"
          type="image/webp"
        />
        <source
          srcset="
            /assets/compressed/products/{{product.images[0].compressedName}}-1024.webp
          "
          media="(max-width: 2048px)"
          type="image/webp"
        />
        <img [src]="product.images[0].url" [alt]="product.name" width="100%" />
      </picture>
      <div
        style="width: 100%; background-color: #efefef; height: 17.5vw"
        *ngIf="!product.images[0]"
      >
        <h1 style="text-align: center; padding: 16px 0">No Image</h1>
      </div>
      <mat-card-footer>
        <mat-card-title style="padding: 0 0 8px 8px">
          {{ product.name }}
        </mat-card-title>
      </mat-card-footer>
    </a>
  </mat-card>
</app - navigation - container > */}
    </>
  )
}
