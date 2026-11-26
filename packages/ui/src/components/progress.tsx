'use client'

import * as ProgressPrimitive from '@ui-sdk/react/progress'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function Progress({
  className,
  value,
  ...props
}: Omit<
  React.ComponentProps<typeof ProgressPrimitive.Progress>,
  'className' | 'children' | 'value' | 'getValueLabel'
> & {
  className?: string
  value?: number | null
}) {
  return (
    <ProgressPrimitive.Progress
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className
      )}
      value={value ?? null}
      {...props}
    >
      {/* ui-sdk sets the fill's width inline; w-0 leaves it empty while indeterminate, as Radix did. */}
      <ProgressPrimitive.ProgressIndicator className="bg-primary h-full w-0 transition-all" />
    </ProgressPrimitive.Progress>
  )
}

export { Progress }
