'use client'

import type { DialogContentProps } from '@ui-sdk/react/dialog'
import * as React from 'react'

import {
  LazyRootContext,
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

// The ui-sdk dialog loads with the content, not with the page. See
// lib/lazy-popup.ts.
const loadDialogPopup = () =>
  import('@mikeallisonjs/ui/components/dialog-popup')
const DialogPopup = React.lazy(loadDialogPopup)

function Dialog({
  children,
  ...options
}: LazyRootOptions & { children?: React.ReactNode }) {
  const root = useLazyRoot(options)
  return (
    <LazyRootContext.Provider value={root}>{children}</LazyRootContext.Provider>
  )
}

function DialogTrigger(props: LightButtonProps) {
  const root = useLazyRootContext('DialogTrigger')
  return renderLazyTrigger(root, 'dialog-trigger', loadDialogPopup, props)
}

/**
 * @deprecated Renders its children. ui-sdk dialogs open in the browser's top
 * layer where they are, so they need no portal.
 */
function DialogPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function DialogClose(props: LightButtonProps) {
  const root = useLazyRootContext('DialogClose')
  const parts = React.useContext(LoadedPartsContext)
  return renderLazyClose(root, parts, 'dialog-close', props)
}

const overlayClassName =
  'data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 fixed inset-0 bg-black/50'

/**
 * @deprecated Renders nothing. DialogContent renders the backdrop itself, from
 * the chunk it loads.
 */
function DialogOverlay(_props: React.ComponentProps<'div'>) {
  return null
}

type LazyContentProps = React.ComponentProps<'div'> &
  Pick<DialogContentProps, 'initialFocus' | 'finalFocus' | 'keepMounted'>

function DialogContent({
  className,
  showCloseButton = true,
  ...props
}: LazyContentProps & { showCloseButton?: boolean }) {
  const root = useLazyRootContext('DialogContent')
  if (!root.mounted) return null
  return (
    <React.Suspense fallback={null}>
      <DialogPopup
        root={root}
        backdropClassName={overlayClassName}
        className={cn(
          'bg-background data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        closeClassName={
          showCloseButton
            ? "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            : undefined
        }
        {...props}
      />
    </React.Suspense>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <LoadedPart
      kind="Title"
      fallback="h2"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<'p'>) {
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
