import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const data = await req.text()
  const body = JSON.parse(data)

  if (body?.email != null && body?.permalink != null) {
    prisma.order.upsert({
      where: { email: body.email },
      update: {
        products: { connect: body.product_permalink }
      },
      create: {
        email: body.email,
        products: { connect: body.product_permalink }
      }
    })
  }
  // revalidateTag()
  return new Response(null, { status: 200 })
}
