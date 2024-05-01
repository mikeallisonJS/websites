'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { useFormStatus } from 'react-dom'

import { ProductVariant } from '../../lib/shopify/types'
import { useCart } from '../../lib/useCart'
import LoadingDots from '../loadingDots'

// import { addItem } from './actions'

function SubmitButton({
  id,
  availableForSale,
  selectedVariantId
}: {
  id: string
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  const { addToCart } = useCart()
  const { pending } = useFormStatus()
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    )
  }

  // if (!selectedVariantId) {
  //   return (
  //     <button
  //       aria-label="Please select an option"
  //       aria-disabled
  //       className={clsx(buttonClasses, disabledClasses)}
  //       onClick={() => addToCart(id)}
  //     >
  //       <div className="absolute left-0 ml-4">
  //         <PlusIcon className="h-5" />
  //       </div>
  //       Add To Cart
  //     </button>
  //   )
  // }

  return (
    <button
      onClick={(e: FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault()
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add To Cart
    </button>
  )
}

export function AddToCart({
  id,
  variants,
  availableForSale
}: {
  id: string
  variants: ProductVariant[]
  availableForSale: boolean
}) {
  // const { addToCart } = useCart()
  // const [message, formAction] = useFormState(addItem, null)
  const searchParams = useSearchParams()
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  )
  const selectedVariantId = variant?.id || defaultVariantId
  // const actionWithVariant = formAction.bind(null, selectedVariantId)

  return (
    // <form action={actionWithVariant}>
    <SubmitButton
      id={id}
      availableForSale={availableForSale}
      selectedVariantId={selectedVariantId}
    />
    // </form>
  )
}
