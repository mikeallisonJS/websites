'use client'

import * as AlertDialogPrimitive from '@ui-sdk/react/alert-dialog'
import * as React from 'react'

import { buttonVariants } from '@mikeallisonjs/ui/components/button'
import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'
import { cn } from '@mikeallisonjs/ui/lib/utils'

type ButtonPartProps = Omit<React.ComponentProps<'button'>, 'value'> & {
  asChild?: boolean
}

function AlertDialog(props: AlertDialogPrimitive.AlertDialogProps) {
  const container = usePopupContainer()
  return <AlertDialogPrimitive.AlertDialog container={container} {...props} />
}

function AlertDialogTrigger({ asChild, children, ...props }: ButtonPartProps) {
  return (
    <AlertDialogPrimitive.AlertDialogTrigger
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

/**
 * @deprecated Renders its children. ui-sdk dialogs open in the browser's top
 * layer where they are, so they need no portal.
 */
function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <AlertDialogPrimitive.AlertDialogBackdrop
      className={cn(
        'data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 fixed inset-0 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<'div'> &
  Pick<
    AlertDialogPrimitive.AlertDialogContentProps,
    'initialFocus' | 'finalFocus' | 'keepMounted'
  >) {
  return (
    <>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.AlertDialogContent
        className={cn(
          'bg-background data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      />
    </>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <AlertDialogPrimitive.AlertDialogTitle
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <AlertDialogPrimitive.AlertDialogDescription
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  asChild,
  children,
  ...props
}: ButtonPartProps) {
  return (
    <AlertDialogPrimitive.AlertDialogClose
      className={cn(buttonVariants(), className)}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function AlertDialogCancel({
  className,
  asChild,
  children,
  ...props
}: ButtonPartProps) {
  return (
    <AlertDialogPrimitive.AlertDialogClose
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
}
