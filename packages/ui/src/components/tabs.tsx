'use client'

import * as TabsPrimitive from '@ui-sdk/react/tabs'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// The API matches the Radix-based shadcn Tabs this replaced. Radix uses '' for
// "no tab selected"; ui-sdk uses null.
const toSdkValue = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? null : value

function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  orientation,
  activationMode,
  ...props
}: Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  activationMode?: 'automatic' | 'manual'
}) {
  return (
    <TabsPrimitive.Tabs<string>
      value={toSdkValue(value)}
      defaultValue={toSdkValue(defaultValue)}
      onValueChange={(next) => onValueChange?.(next ?? '')}
      orientation={orientation}
      activation={activationMode}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <TabsPrimitive.TabsList
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  asChild,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  value: string
  asChild?: boolean
}) {
  return (
    <TabsPrimitive.TabsTab
      className={cn(
        "data-selected:bg-background dark:data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-selected:border-input dark:data-selected:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 data-disabled:pointer-events-none data-disabled:opacity-50 data-selected:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function TabsContent({
  className,
  forceMount,
  ...props
}: React.ComponentProps<'div'> & {
  value: string
  forceMount?: boolean
}) {
  return (
    <TabsPrimitive.TabsPanel
      keepMounted={forceMount}
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
