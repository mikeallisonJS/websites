import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import OpengraphImage from '../../../components/opengraphImage'
import { schema } from '../../../lib/drizzle'

const db = drizzle(sql, { schema })

export const runtime = 'edge'

export default async function Image({
  params
}: {
  params: { collection: string }
}) {
  const collection = await db.query.category.findFirst({
    where: (category, { eq }) => eq(category.id, params.collection)
  })
  const title = collection?.name

  return await OpengraphImage({ title })
}
