import { Component, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const GET_PRODUCTS = gql`
  query products {
    collection(id: "gid://shopify/Collection/158422827145") {
      id
      products(first: 30) {
        nodes {
          id
          title
          featuredImage {
            url
          }
        }
      }
    }
  }
`

@Component({
  selector: 'app-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products?: Observable<any>
  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.products = this.apollo
      .watchQuery({ query: GET_PRODUCTS })
      .valueChanges.pipe(
        map((result: any) => result.data.collection.products.nodes)
      )
  }
}
