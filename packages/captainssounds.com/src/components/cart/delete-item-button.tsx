'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FormEvent, ReactElement } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import type { CartItem } from '../../lib/shopify/types'
import LoadingDots from '../loading-dots'

import { removeItem } from './actions'

function SubmitButton(): ReactElement {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      onClick={(e: FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault()
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  )
}

export function DeleteItemButton({ item }: { item: CartItem }): ReactElement {
  const [message, formAction] = useFormState(removeItem, null)
  const itemId = item.id
  const actionWithVariant = formAction.bind(null, itemId)

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message ?? ''}
      </p>
    </form>
  )
}
