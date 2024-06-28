import Image from 'next/image'
import type { ComponentProps } from 'react'

import { cn } from '@websites/shared/react/lib'

import Label from '../label'

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean
  active?: boolean
  label?: {
    title: string
    amount: string
    currencyCode: string
    position?: 'bottom' | 'center'
  }
} & ComponentProps<typeof Image>) {
  return (
    <div
      className={cn(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={cn('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105':
              isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  )
}
