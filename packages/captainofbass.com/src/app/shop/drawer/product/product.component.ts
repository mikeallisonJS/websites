import { Component, OnDestroy, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { Subscription } from 'rxjs'
import { ShopService } from '../../shop.service'

const GET_PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      availableForSale
      description
      title
      images(first: 30) {
        nodes {
          url
        }
      }
      options {
        id
        name
        values
      }
    }
  }
`

@Component({
  selector: 'app-shop-drawer-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: any
  private querySubscription?: Subscription
  constructor(private apollo: Apollo, private shopService: ShopService) {}
  ngOnInit(): void {
    this.querySubscription = this.product = this.apollo
      .watchQuery({
        query: GET_PRODUCT,
        variables: { id: this.shopService.selectedProductId }
      })
      .valueChanges.subscribe(({ data }: { data: any }) => {
        console.log(data.product)
        return data.product
      })
  }
  ngOnDestroy() {
    this.querySubscription?.unsubscribe()
  }
  image() {
    return this.product?.images?.nodes[0].url ?? ''
  }
}
