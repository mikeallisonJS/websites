import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

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
    prisma.order.upsert({
      where: { email },
      update: {
        products: { connect: permalink }
      },
      create: {
        email,
        products: { connect: permalink }
      }
    })
    // revalidateTag()
    return new Response(null, { status: 200 })
  }
  return new Response('Unauthorized Request', {
    status: 401
  })
}
