'use client'

import * as ScrollAreaPrimitive from '@ui-sdk/react/scroll-area'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function ScrollArea({
  className,
  children,
  type,
  scrollHideDelay,
  ...props
}: React.ComponentProps<'div'> & {
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  scrollHideDelay?: number
}) {
  return (
    <ScrollAreaPrimitive.ScrollArea
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaViewport className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1">
        <ScrollAreaPrimitive.ScrollAreaContent>
          {children}
        </ScrollAreaPrimitive.ScrollAreaContent>
      </ScrollAreaPrimitive.ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaPrimitive.ScrollAreaCorner />
    </ScrollAreaPrimitive.ScrollArea>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: 'vertical' | 'horizontal'
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        'data-visible:opacity-100 flex p-px opacity-0 transition-opacity',
        orientation === 'vertical' && 'w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
