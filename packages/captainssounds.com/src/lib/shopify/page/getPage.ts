import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import { ShopifyPageOperation } from '../types'

import { pageFragment } from './pageFragment'

const getPageQuery = graphql(
  `
    query getPage($handle: String!) {
      pageByHandle(handle: $handle) {
        ...page
      }
    }
  `,
  [pageFragment]
)

export async function getPage(handle: string) {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  })

  return res.body.data.pageByHandle
}
