'use client'

import * as CheckboxPrimitive from '@ui-sdk/react/checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Checkbox>,
  'className' | 'children' | 'onCheckedChange'
> & {
  className?: string
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  // react-hook-form's `register` spreads one in. Radix put it on the button,
  // where it never fired, so it is dropped.
  onChange?: React.FormEventHandler<HTMLButtonElement>
}

function Checkbox({
  className,
  onCheckedChange,
  onChange: _onChange,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Checkbox
      className={cn(
        'peer border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onCheckedChange={(checked) => onCheckedChange?.(checked)}
      {...props}
    >
      <CheckboxPrimitive.CheckboxIndicator className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Checkbox>
  )
}

export { Checkbox }
