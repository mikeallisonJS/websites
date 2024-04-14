import { TAGS } from '../constants'
import { ensureStartsWith } from '../utils'

import { getMenuQuery } from './queries/menu'
import { shopifyFetch } from './shopifyFetch'
import { Menu, ShopifyMenuOperation } from './types'

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  })

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        .replace('/collections', '/search')
        .replace('/pages', '')
    })) || []
  )
}
