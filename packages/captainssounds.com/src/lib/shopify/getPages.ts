import { getPagesQuery } from "./queries/page"
import { removeEdgesAndNodes } from "./removeEdgesAndNodes"
import { shopifyFetch } from "./shopifyFetch"
import { Page, ShopifyPagesOperation } from "./types"

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  })

  return removeEdgesAndNodes(res.body.data.pages)
}