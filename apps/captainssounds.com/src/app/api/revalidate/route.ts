import type { NextRequest } from 'next/server'

import { revalidate } from '../../../lib/shopify'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  return revalidate(req)
}
