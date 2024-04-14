import { graphql } from 'gql.tada'

import { shopifyFetch } from '../shopifyFetch'
import { Page, ShopifyPageOperation } from '../types'

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

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  })

  return res.body.data.pageByHandle
}
