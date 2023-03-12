import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache
} from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { setContext } from '@apollo/client/link/context'
import { environment } from '../../environments/environment'

const uri = 'https://captain-productions.myshopify.com/api/2023-01/graphql.json' // <-- add the URL of the GraphQL server here
const headers = setContext((operation, context) => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
  }
}))
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: ApolloLink.from([headers, httpLink.create({ uri })]),
    cache: new InMemoryCache()
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
