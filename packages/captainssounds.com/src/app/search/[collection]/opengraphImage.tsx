import { Pool } from '@neondatabase/serverless'

import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

import OpengraphImage from '../../../components/opengraphImage'

export const runtime = 'edge'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

export default async function Image({
  params
}: {
  params: { collection: string }
}) {
  const collection = await prisma.category.findUnique({
    where: { id: params.collection }
  })
  const title = collection?.name

  return await OpengraphImage({ title })
}
