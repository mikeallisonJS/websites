'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@mikeallisonjs/shared-react-components'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { schema } from '../../../../lib/drizzle'

export function Selector({
  categoryId,
  categories,
  productId,
  products
}: {
  categoryId?: string
  categories: Pick<typeof schema.category.$inferSelect, 'id' | 'name'>[]
  productId?: string
  products: Pick<
    typeof schema.product.$inferSelect,
    'id' | 'name' | 'categoryId'
  >[]
}) {
  const router = useRouter()

  const buildUrl = (categoryId?: string, productId?: string) => {
    let url = '/admin/products'
    if (categoryId !== 'all' && categoryId !== undefined) {
      url += `/category/${categoryId}`
    }
    if (productId !== undefined) {
      url += `/product/${productId}`
    }
    return url
  }
  const setCategoryId = (categoryId: string) => {
    router.push(buildUrl(categoryId, productId))
  }
  return (
    <>
      <Select defaultValue={categoryId ?? 'all'} onValueChange={setCategoryId}>
        <SelectTrigger>
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ScrollArea className="w-full h-full">
        {products.map((product) => (
          <Link href={buildUrl(categoryId, product.id)} key={product.id}>
            <div className={productId === product.id ? 'underline' : ''}>
              {product.name}
            </div>
          </Link>
        ))}
      </ScrollArea>
    </>
  )
}
