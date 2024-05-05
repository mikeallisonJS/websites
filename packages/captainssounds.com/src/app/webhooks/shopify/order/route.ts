import crypto from 'crypto'

import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { NextRequest } from 'next/server'

import { order, orderToProduct } from '../../../../lib/drizzle/schema'

const db = drizzle(sql)

export async function POST(req: NextRequest) {
  const data = await req.text()
  const body = JSON.parse(data)
  const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256')
  const digest = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_HMAC ?? '')
    .update(data)
    .digest('base64')

  if (hmacHeader === digest) {
    if (body?.contact_email != null && body?.line_items?.length > 0) {
      await db.transaction(async (tx) => {
        const result = await tx
          .insert(order)
          .values({
            email: body.contact_email
          })
          .onConflictDoNothing({ target: order.email })
          .returning({ id: order.id })
        if (result[0]?.id == null) {
          throw new Error('Failed to insert order')
        }
        await tx
          .insert(orderToProduct)
          .values({ orderId: result[0].id, productId: body.line_items[0].sku })
          .onConflictDoNothing()
      })
    }
    // revalidateTag()
    return new Response(null, { status: 200 })
  }
  return new Response('Unauthorized Request', {
    status: 401
  })
}
