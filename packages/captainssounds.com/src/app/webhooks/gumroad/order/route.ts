import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { NextRequest } from 'next/server'

import { order, orderToProduct } from '../../../../lib/drizzle/schema'

const db = drizzle(sql)

export async function POST(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const data = await req.formData()
  const validation = params.get('validation')
  const email = data.get('email')
  const permalink = data.get('permalink')

  if (
    email != null &&
    permalink != null &&
    validation === process.env.GUMROAD_VALIDATION
  ) {
    await db.transaction(async (tx) => {
      const result = await tx
        .insert(order)
        .values({
          email: email as string
        })
        .onConflictDoNothing({ target: order.email })
        .returning({ id: order.id })
      if (result[0]?.id == null) {
        throw new Error('Failed to insert order')
      }
      await tx
        .insert(orderToProduct)
        .values({ orderId: result[0].id, productId: permalink as string })
        .onConflictDoNothing()
    })
    // revalidateTag()
    return new Response(null, { status: 200 })
  }
  return new Response('Unauthorized Request', {
    status: 401
  })
}
