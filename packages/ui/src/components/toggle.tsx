'use client'

import * as TogglePrimitive from '@ui-sdk/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { cn } from '@mikeallisonjs/ui/lib/utils'

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-accent data-pressed:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        default: 'h-9 px-2 min-w-9',
        sm: 'h-8 px-1.5 min-w-8',
        lg: 'h-10 px-2.5 min-w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

function Toggle({
  className,
  variant,
  size,
  asChild,
  children,
  onPressedChange,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value' | 'defaultValue' | 'onChange'> &
  Pick<
    React.ComponentProps<typeof TogglePrimitive.Toggle>,
    'pressed' | 'defaultPressed' | 'value' | 'focusableWhenDisabled'
  > &
  VariantProps<typeof toggleVariants> & {
    asChild?: boolean
    onPressedChange?: (pressed: boolean) => void
  }) {
  return (
    <TogglePrimitive.Toggle
      className={cn(toggleVariants({ variant, size, className }))}
      onPressedChange={(pressed) => onPressedChange?.(pressed)}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

export { Toggle, toggleVariants }
