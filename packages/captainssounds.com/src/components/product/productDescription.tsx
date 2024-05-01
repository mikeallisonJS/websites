import { Suspense } from 'react'

import { Block, BlockType, Product } from '@prisma/client'
import { cn } from '@websites/shared/react/lib'

import { AddToCart } from '../cart/addToCart'
import Price from '../price'

// import { VariantSelector } from './variantSelector'

export function ProductDescription({
  product
}: {
  product: Product & { blocks: Block[] }
}) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.price.toString()}
            currencyCode="USD"
            donation={product.donationware}
          />
        </div>
      </div>
      {/* <Suspense fallback={null}>
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </Suspense> */}

      {product.blocks.map((block, blockIndex) => {
        switch (block.type) {
          case BlockType.Text:
            return (
              <div key={block.id} className={cn('mb-6', block.className)}>
                {block.value}
              </div>
            )
          case BlockType.List:
            return (
              <ul className={cn('mb-6', block.className)}>
                {block.value.split('|').map((item, index) => (
                  <li key={`${blockIndex}-${index}`}>{item}</li>
                ))}
              </ul>
            )
          case BlockType.Youtube:
            return (
              <div key={block.id} className={cn('mb-6', block.className)}>
                <iframe
                  width="100%"
                  height={315}
                  src={`https://youtube.com/embed/${block.value}`}
                  title={product.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            )
          default:
            return null
        }
      })}
      {/* {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null} */}

      <Suspense fallback={null}>
        <AddToCart
          id={product.id}
          variants={[]} //product.variants}
          availableForSale={true} //product.availableForSale}
        />
      </Suspense>
    </>
  )
}
