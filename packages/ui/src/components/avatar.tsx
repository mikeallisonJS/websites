'use client'

import * as AvatarPrimitive from '@ui-sdk/react/avatar'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

function Avatar({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AvatarPrimitive.Avatar>, 'className'> & {
  className?: string
}) {
  return (
    <AvatarPrimitive.Avatar
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof AvatarPrimitive.AvatarImage>,
  'className'
> & { className?: string }) {
  return (
    <AvatarPrimitive.AvatarImage
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  delayMs,
  ...props
}: Omit<
  React.ComponentProps<typeof AvatarPrimitive.AvatarFallback>,
  'className' | 'delay'
> & { className?: string; delayMs?: number }) {
  return (
    <AvatarPrimitive.AvatarFallback
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className
      )}
      delay={delayMs}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
