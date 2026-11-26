'use client'

import type { DrawerContentProps, SnapPoint } from '@ui-sdk/react/drawer'
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

// The ui-sdk drawer loads with the content, not with the page. See
// lib/lazy-popup.ts.
const { preload: loadDrawerPopup, Popup: DrawerPopup } = createLazyPopup(
  () => import('@mikeallisonjs/ui/components/drawer-popup')
)

type DrawerOptions = {
  side: 'top' | 'right' | 'bottom' | 'left'
  dismissible: boolean
  autoFocus: boolean
  onClose?: () => void
  snapPoints?: SnapPoint[]
  activeSnapPoint?: SnapPoint
  setActiveSnapPoint?: (snapPoint: SnapPoint) => void
}

const DrawerOptionsContext = React.createContext<DrawerOptions>({
  side: 'bottom',
  dismissible: true,
  autoFocus: false
})

// The vaul props callers used. `onClose` runs when the drawer closes itself:
// Escape, a swipe, an outside press or a Close part. Snap points are
// fractions of the screen or pixels, as in vaul, and also rem, % or 'content'.
function Drawer({
  children,
  direction = 'bottom',
  dismissible = true,
  autoFocus = false,
  onClose,
  snapPoints,
  activeSnapPoint,
  setActiveSnapPoint,
  ...options
}: LazyRootOptions & {
  children?: React.ReactNode
  direction?: 'top' | 'right' | 'bottom' | 'left'
  dismissible?: boolean
  autoFocus?: boolean
  onClose?: () => void
  snapPoints?: SnapPoint[]
  // vaul's null, nothing chosen, opens at the first point.
  activeSnapPoint?: SnapPoint | null
  setActiveSnapPoint?: (snapPoint: SnapPoint) => void
}) {
  const root = useLazyRoot(options)
  const drawer = React.useMemo(
    () => ({
      side: direction,
      dismissible,
      autoFocus,
      onClose,
      snapPoints,
      activeSnapPoint: activeSnapPoint ?? undefined,
      setActiveSnapPoint
    }),
    [
      direction,
      dismissible,
      autoFocus,
      onClose,
      snapPoints,
      activeSnapPoint,
      setActiveSnapPoint
    ]
  )
  return (
    <LazyRootProvider root={root}>
      <DrawerOptionsContext.Provider value={drawer}>
        {children}
      </DrawerOptionsContext.Provider>
    </LazyRootProvider>
  )
}

function DrawerTrigger(props: LightButtonProps) {
  const root = useLazyRootContext('DrawerTrigger')
  return renderLazyTrigger(root, 'drawer-trigger', loadDrawerPopup, props)
}

/**
 * @deprecated Renders its children. ui-sdk drawers open in the browser's top
 * layer where they are, so they need no portal.
 */
function DrawerPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function DrawerClose(props: LightButtonProps) {
  const root = useLazyRootContext('DrawerClose')
  const parts = React.useContext(LoadedPartsContext)
  return renderLazyClose(root, parts, 'drawer-close', props)
}

/**
 * @deprecated Renders nothing. DrawerContent renders the backdrop itself, from
 * the chunk it loads.
 */
function DrawerOverlay(_props: React.ComponentProps<'div'>) {
  return null
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'> &
  Pick<DrawerContentProps, 'initialFocus' | 'finalFocus' | 'keepMounted'> & {
    // As in vaul: preventDefault() keeps the drawer open.
    onEscapeKeyDown?: (event: KeyboardEvent) => void
  }) {
  const root = useLazyRootContext('DrawerContent')
  const {
    side,
    dismissible,
    autoFocus,
    onClose,
    snapPoints,
    activeSnapPoint,
    setActiveSnapPoint
  } = React.useContext(DrawerOptionsContext)
  if (!root.mounted) return null
  return (
    <DrawerPopup
      root={root}
      side={side}
      dismissible={dismissible}
      onClose={onClose}
      snapPoints={snapPoints}
      snapPoint={activeSnapPoint}
      onSnapPointChange={setActiveSnapPoint}
      // vaul kept focus where it was unless `autoFocus` was set.
      initialFocus={props.initialFocus ?? (autoFocus ? 'auto' : 'none')}
      backdropClassName="bg-black/50"
      className={cn(
        'group/drawer-content bg-background flex h-auto flex-col',
        'data-[side=top]:mb-24 data-[side=top]:max-h-[80vh] data-[side=top]:w-full data-[side=top]:rounded-b-lg data-[side=top]:border-b',
        'data-[side=bottom]:mt-24 data-[side=bottom]:max-h-[80vh] data-[side=bottom]:w-full data-[side=bottom]:rounded-t-lg data-[side=bottom]:border-t',
        'data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm',
        'data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm',
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[side=bottom]/drawer-content:block"
      />
      {children}
    </DrawerPopup>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <LoadedPart
      kind="Title"
      fallback="h2"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<'p'>) {
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
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
}
