import { graphql } from 'gql.tada'

import cartFragment from '../fragments/cart'

export const getCartQuery = graphql(
  `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...cart
      }
    }
  `,
  [cartFragment]
)
