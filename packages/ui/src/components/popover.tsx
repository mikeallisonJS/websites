'use client'

import * as PopoverPrimitive from '@ui-sdk/react/popover'
import { mergeProps, renderElement } from '@ui-sdk/react/primitive'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// ui-sdk has no Anchor part, so PopoverAnchor hands its element to the content.
const AnchorContext = React.createContext<
  [Element | null, (anchor: Element | null) => void]
>([null, () => {}])

function Popover(props: PopoverPrimitive.PopoverProps) {
  const anchor = React.useState<Element | null>(null)
  const container = usePopupContainer()
  return (
    <AnchorContext.Provider value={anchor}>
      <PopoverPrimitive.Popover container={container} {...props} />
    </AnchorContext.Provider>
  )
}

function PopoverTrigger({
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value'> & { asChild?: boolean }) {
  return (
    <PopoverPrimitive.PopoverTrigger
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<'div'> &
  Pick<
    PopoverPrimitive.PopoverContentProps,
    | 'side'
    | 'align'
    | 'sideOffset'
    | 'alignOffset'
    | 'collisionPadding'
    | 'initialFocus'
    | 'finalFocus'
    | 'keepMounted'
  >) {
  const [anchor] = React.useContext(AnchorContext)
  return (
    <PopoverPrimitive.PopoverContent
      anchor={anchor}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-72 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-hidden',
        className
      )}
      {...props}
    />
  )
}

function PopoverAnchor({
  asChild,
  children,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const [, setAnchor] = React.useContext(AnchorContext)
  const { render, ...content } = asChildProps(asChild, children)
  return renderElement(
    'div',
    mergeProps(props, content, { ref: setAnchor }),
    render
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
