import { XMarkIcon } from '@heroicons/react/24/outline'

import { cn } from '@websites/shared/react/lib'

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={cn(
          'h-6 transition-all ease-in-out hover:scale-110 ',
          className
        )}
      />
    </div>
  )
}
