'use client'

// The ui-sdk drawer behind Drawer. It loads on first open, or when a trigger
// is hovered, pressed or focused; keep it out of eager imports. See
// lib/lazy-popup.ts.

import * as DrawerPrimitive from '@ui-sdk/react/drawer'
import * as React from 'react'

import {
  LoadedPartsContext,
  type LazyRoot,
  type LoadedParts
} from '@mikeallisonjs/ui/lib/lazy-popup'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'

const parts: LoadedParts = {
  Title: DrawerPrimitive.DrawerTitle,
  Description: DrawerPrimitive.DrawerDescription,
  Close: DrawerPrimitive.DrawerClose
}

type DrawerPopupProps = React.ComponentProps<'div'> &
  Pick<
    React.ComponentProps<typeof DrawerPrimitive.DrawerContent>,
    'initialFocus' | 'finalFocus' | 'keepMounted'
  > & {
    root: LazyRoot
    side: 'top' | 'right' | 'bottom' | 'left'
    dismissible: boolean
    onClose?: () => void
    backdropClassName: string
  }

function DrawerPopup({
  root,
  side,
  dismissible,
  onClose,
  backdropClassName,
  finalFocus,
  children,
  ...props
}: DrawerPopupProps) {
  const container = usePopupContainer()
  const { open, modal, setOpen } = root

  // ui-sdk closes a non-modal drawer on Escape only while focus is inside it.
  // vaul closed it from anywhere, and the music player opens its playlist
  // without moving focus there. ui-sdk has already called preventDefault()
  // on that Escape, so this goes by focus instead: inside any ui-sdk popup,
  // this one or one above it, the Escape is ui-sdk's.
  React.useEffect(() => {
    if (!open || modal !== false || !dismissible) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.isComposing) return
      if (document.activeElement?.closest('[popover]')) return
      onClose?.()
      setOpen(false, { reason: 'escape-key', event })
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, modal, dismissible, onClose, setOpen])

  return (
    <DrawerPrimitive.Drawer
      open={root.open}
      onOpenChange={(open, details) => {
        // vaul ran onClose when the drawer itself closed, not when its
        // parent closed it.
        if (!open) onClose?.()
        root.setOpen(open, details)
      }}
      modal={root.modal}
      side={side}
      dismissible={dismissible}
      container={container}
    >
      <LoadedPartsContext.Provider value={parts}>
        {/* vaul left a non-modal drawer without a dimmed backdrop. */}
        {root.modal !== false && (
          <DrawerPrimitive.DrawerBackdrop className={backdropClassName} />
        )}
        <DrawerPrimitive.DrawerContent
          finalFocus={finalFocus ?? root.finalFocus}
          {...props}
        >
          {children}
        </DrawerPrimitive.DrawerContent>
      </LoadedPartsContext.Provider>
    </DrawerPrimitive.Drawer>
  )
}

export default DrawerPopup
