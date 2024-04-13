import { AddToCart } from '../cart/add-to-cart'
import Price from '../price'
import Prose from '../prose'
import { Product } from '../../lib/shopify/types'
import { ReactElement, Suspense } from 'react'
import { VariantSelector } from './variant-selector'

export function ProductDescription({
  product
}: {
  product: Product
}): ReactElement {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
      </Suspense>

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <Suspense fallback={null}>
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </Suspense>
    </>
  )
}
