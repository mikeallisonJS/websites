import { DocumentNode, print } from 'graphql'

import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '../constants'
import { isShopifyError } from '../typeGuards'
import { ensureStartsWith } from '../utils'

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : ''
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache
  headers?: HeadersInit
  query: DocumentNode
  tags?: string[]
  variables?: ExtractVariables<T>
}) {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query: print(query) }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    })

    const body = await result.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: result.status,
      body
    }
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      }
    }

    throw {
      error: e,
      query
    }
  }
}
