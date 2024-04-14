import { getPageQuery } from './queries/page'
import { shopifyFetch } from './shopifyFetch'
import { Page, ShopifyPageOperation } from './types'

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  })

  return res.body.data.pageByHandle
}
