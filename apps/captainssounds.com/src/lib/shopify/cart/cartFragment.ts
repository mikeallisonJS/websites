import { graphql } from 'gql.tada'

import productFragment from '../product/productFragment'

const cartFragment = graphql(
  `
    fragment cart on Cart {
      id
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                selectedOptions {
                  name
                  value
                }
                product {
                  ...product
                }
              }
            }
          }
        }
      }
      totalQuantity
    }
  `,
  [productFragment]
)

export default cartFragment
