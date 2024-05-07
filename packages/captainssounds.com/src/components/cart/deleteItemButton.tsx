'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from 'use-shopping-cart'

export function DeleteItemButton({ id }: { id: string }) {
  const { removeItem } = useShoppingCart()
  return (
    <button
      type="button"
      onClick={() => removeItem(id)}
      aria-label="Remove cart item"
      className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  )
}
