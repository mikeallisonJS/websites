'use client'

import { Separator as SeparatorPrimitive } from '@ui-sdk/react/separator'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: Omit<React.ComponentProps<typeof SeparatorPrimitive>, 'className'> & {
  className?: string
}) {
  return (
    <SeparatorPrimitive
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  )
}

export { Separator }
