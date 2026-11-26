'use client'

import * as SwitchPrimitive from '@ui-sdk/react/switch'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function Switch({
  className,
  onCheckedChange,
  ...props
}: Omit<
  React.ComponentProps<typeof SwitchPrimitive.Switch>,
  'className' | 'children' | 'onCheckedChange'
> & {
  className?: string
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <SwitchPrimitive.Switch
      className={cn(
        'peer data-checked:bg-primary data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-unchecked:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onCheckedChange={(checked) => onCheckedChange?.(checked)}
      {...props}
    >
      <SwitchPrimitive.SwitchThumb className="bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0" />
    </SwitchPrimitive.Switch>
  )
}

export { Switch }
