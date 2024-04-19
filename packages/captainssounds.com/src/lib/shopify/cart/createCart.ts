import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import { ShopifyCreateCartOperation } from '../types'

import cartFragment from './cartFragment'
import { reshapeCart } from './reshapeCart'

const createCartMutation = graphql(
  `
    mutation createCart($lineItems: [CartLineInput!]) {
      cartCreate(input: { lines: $lineItems }) {
        cart {
          ...cart
        }
      }
    }
  `,
  [cartFragment]
)

export async function createCart() {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  })

  return reshapeCart(res.body.data.cartCreate.cart)
}
