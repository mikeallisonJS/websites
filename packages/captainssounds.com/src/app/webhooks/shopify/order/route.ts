import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

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
      prisma.order.upsert({
        where: { email: body.contact_email },
        update: {
          products: { connect: body.line_items.map((item: any) => item.sku) }
        },
        create: {
          email: body.contact_email,
          products: { connect: body.line_items.map((item: any) => item.sku) }
        }
      })
    }
    // revalidateTag()
    return new Response(null, { status: 200 })
  } else {
    return new Response('Unauthorized Request', {
      status: 401
    })
  }
}
