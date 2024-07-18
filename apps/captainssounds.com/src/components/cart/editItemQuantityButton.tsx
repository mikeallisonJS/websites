'use client'

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from 'use-shopping-cart'

import { cn } from '@mikeallisonjs/shared-react-lib'

export function EditItemQuantityButton({
  id,
  type
}: {
  id: string
  type: 'plus' | 'minus'
}) {
  const { incrementItem, decrementItem } = useShoppingCart()

  return (
    <button
      type="submit"
      onClick={() => {
        if (type === 'plus') {
          incrementItem(id)
        } else {
          decrementItem(id)
        }
      }}
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      className={cn(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus'
        }
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  )
}
