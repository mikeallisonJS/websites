import OpengraphImage from '../../../components/opengraphImage'
import { db } from '../../../lib/drizzle'

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
