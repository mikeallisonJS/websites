'use client'

import * as RadioGroupPrimitive from '@ui-sdk/react/radio'
import { CircleIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function RadioGroup({
  className,
  onValueChange,
  ...props
}: Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.RadioGroup<string>>,
  'className' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <RadioGroupPrimitive.RadioGroup<string>
      className={cn('grid gap-3', className)}
      // ui-sdk passes null for "nothing checked", as after a reset; Radix used ''.
      onValueChange={(next) => onValueChange?.(next ?? '')}
      {...props}
    />
  )
}

// Radios in a disabled group get data-disabled but not the native attribute.
function RadioGroupItem({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Radio>,
  'className' | 'children'
> & { className?: string }) {
  return (
    <RadioGroupPrimitive.Radio
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.RadioIndicator className="relative flex items-center justify-center">
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.RadioIndicator>
    </RadioGroupPrimitive.Radio>
  )
}

export { RadioGroup, RadioGroupItem }
