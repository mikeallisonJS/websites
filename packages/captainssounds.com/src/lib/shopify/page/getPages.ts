import { graphql } from 'gql.tada'

import { removeEdgesAndNodes } from '../removeEdgesAndNodes'
import { shopifyFetch } from '../shopifyFetch'
import { ShopifyPagesOperation } from '../types'

import { pageFragment } from './pageFragment'

const getPagesQuery = graphql(
  `
    query getPages {
      pages(first: 100) {
        edges {
          node {
            ...page
          }
        }
      }
    }
  `,
  [pageFragment]
)

export async function getPages() {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  })

  return removeEdgesAndNodes(res.body.data.pages)
}
