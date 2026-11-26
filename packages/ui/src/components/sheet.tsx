'use client'

import type { DialogContentProps } from '@ui-sdk/react/dialog'
import * as React from 'react'

import {
  createLazyPopup,
  LazyRootProvider,
  LoadedPart,
  LoadedPartsContext,
  renderLazyClose,
  renderLazyTrigger,
  useLazyRoot,
  useLazyRootContext,
  type LazyRootOptions,
  type LightButtonProps
} from '@mikeallisonjs/ui/lib/lazy-popup'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// A sheet is a dialog against an edge. It shares Dialog's chunk, which loads
// with the content, not with the page. See lib/lazy-popup.ts.
const { preload: loadDialogPopup, Popup: DialogPopup } = createLazyPopup(
  () => import('@mikeallisonjs/ui/components/dialog-popup')
)

function Sheet({
  children,
  ...options
}: LazyRootOptions & { children?: React.ReactNode }) {
  const root = useLazyRoot(options)
  return <LazyRootProvider root={root}>{children}</LazyRootProvider>
}

function SheetTrigger(props: LightButtonProps) {
  const root = useLazyRootContext('SheetTrigger')
  return renderLazyTrigger(root, 'sheet-trigger', loadDialogPopup, props)
}

function SheetClose(props: LightButtonProps) {
  const root = useLazyRootContext('SheetClose')
  const parts = React.useContext(LoadedPartsContext)
  return renderLazyClose(root, parts, 'sheet-close', props)
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<'div'> &
  Pick<DialogContentProps, 'initialFocus' | 'finalFocus' | 'keepMounted'> & {
    side?: 'top' | 'right' | 'bottom' | 'left'
    // As in Radix: preventDefault() keeps the sheet open.
    onEscapeKeyDown?: (event: KeyboardEvent) => void
  }) {
  const root = useLazyRootContext('SheetContent')
  if (!root.mounted) return null
  return (
    <DialogPopup
      root={root}
      data-side={side}
      backdropClassName="data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 fixed inset-0 bg-black/50"
      className={cn(
        'bg-background data-open:animate-in data-ending-style:animate-out fixed flex flex-col gap-4 shadow-lg transition ease-in-out data-ending-style:duration-300 data-open:duration-500',
        side === 'right' &&
          'data-ending-style:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 left-auto h-full w-3/4 border-l sm:max-w-sm',
        side === 'left' &&
          'data-ending-style:slide-out-to-left data-open:slide-in-from-left inset-y-0 right-auto left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top' &&
          'data-ending-style:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 bottom-auto h-auto border-b',
        side === 'bottom' &&
          'data-ending-style:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 top-auto bottom-0 h-auto border-t',
        className
      )}
      closeClassName="ring-offset-background focus:ring-ring data-open:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
      closeIconClassName="size-4"
      {...props}
    >
      {children}
    </DialogPopup>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <LoadedPart
      kind="Title"
      fallback="h2"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <LoadedPart
      kind="Description"
      fallback="p"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
}
