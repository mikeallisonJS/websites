'use client'

import * as TooltipPrimitive from '@ui-sdk/react/tooltip'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// ui-sdk tooltips group without a provider; this only carries the delay.
const DelayContext = React.createContext(0)

function TooltipProvider({
  delayDuration = 0,
  children
}: {
  delayDuration?: number
  children?: React.ReactNode
}) {
  return (
    <DelayContext.Provider value={delayDuration}>
      {children}
    </DelayContext.Provider>
  )
}

function Tooltip({
  delayDuration,
  ...props
}: Omit<TooltipPrimitive.TooltipProps, 'delay'> & { delayDuration?: number }) {
  const delay = React.useContext(DelayContext)
  const container = usePopupContainer()
  return (
    <TooltipPrimitive.Tooltip
      container={container}
      delay={delayDuration ?? delay}
      {...props}
    />
  )
}

function TooltipTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value'> & { asChild?: boolean }) {
  return (
    <TooltipPrimitive.TooltipTrigger
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<'div'> &
  Pick<
    TooltipPrimitive.TooltipContentProps,
    | 'side'
    | 'align'
    | 'sideOffset'
    | 'alignOffset'
    | 'collisionPadding'
    | 'arrowPadding'
  >) {
  return (
    <TooltipPrimitive.TooltipContent
      // Radix added the arrow's height, 10px, to the offset.
      sideOffset={sideOffset + 10}
      className={cn(
        'bg-primary text-primary-foreground data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-ending-style:animate-out data-ending-style:fade-out-0 data-ending-style:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-fit origin-(--transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.TooltipArrow className="bg-primary size-2.5 rotate-45 rounded-[2px] data-[side=bottom]:bottom-full data-[side=bottom]:translate-y-[calc(50%+2px)] data-[side=left]:left-full data-[side=left]:translate-x-[calc(-50%-2px)] data-[side=right]:right-full data-[side=right]:translate-x-[calc(50%+2px)] data-[side=top]:top-full data-[side=top]:translate-y-[calc(-50%-2px)]" />
    </TooltipPrimitive.TooltipContent>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
