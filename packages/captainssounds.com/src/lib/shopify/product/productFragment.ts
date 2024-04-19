import { graphql } from 'gql.tada'

import seoFragment from '../seoFragment'

import imageFragment from './imageFragment'

const productFragment = graphql(
  `
    fragment product on Product {
      id
      handle
      availableForSale
      title
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
      featuredImage {
        ...image
      }
      images(first: 20) {
        edges {
          node {
            ...image
          }
        }
      }
      seo {
        ...seo
      }
      tags
      updatedAt
    }
  `,
  [imageFragment, seoFragment]
)

export default productFragment
