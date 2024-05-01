'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import { useCart } from '../../lib/useCart'

export function DeleteItemButton({ item }: { item: string }) {
  const { removeFromCart } = useCart((state) => state)

  return (
    <button
      onClick={() => removeFromCart(item)}
      aria-label="Remove cart item"
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending
        }
      )}
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  )
}
