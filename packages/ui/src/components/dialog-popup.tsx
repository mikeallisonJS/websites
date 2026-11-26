'use client'

// The ui-sdk dialog behind Dialog and Sheet. They load this file on first
// open, or when a trigger is hovered, pressed or focused; keep it out of eager
// imports. See lib/lazy-popup.ts.

import * as DialogPrimitive from '@ui-sdk/react/dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import {
  LoadedPartsContext,
  type LazyRoot,
  type LoadedParts
} from '@mikeallisonjs/ui/lib/lazy-popup'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'

const parts: LoadedParts = {
  Title: DialogPrimitive.DialogTitle,
  Description: DialogPrimitive.DialogDescription,
  Close: DialogPrimitive.DialogClose
}

type DialogPopupProps = React.ComponentProps<'div'> &
  Pick<
    DialogPrimitive.DialogContentProps,
    'initialFocus' | 'finalFocus' | 'keepMounted'
  > & {
    root: LazyRoot
    backdropClassName: string
    closeClassName?: string
    closeIconClassName?: string
  }

function DialogPopup({
  root,
  backdropClassName,
  closeClassName,
  closeIconClassName,
  finalFocus,
  children,
  ...props
}: DialogPopupProps) {
  const container = usePopupContainer()
  return (
    <DialogPrimitive.Dialog
      open={root.open}
      onOpenChange={(open, details) => root.setOpen(open, details)}
      modal={root.modal}
      container={container}
    >
      <LoadedPartsContext.Provider value={parts}>
        <DialogPrimitive.DialogBackdrop className={backdropClassName} />
        <DialogPrimitive.DialogContent
          finalFocus={finalFocus ?? root.finalFocus}
          {...props}
        >
          {children}
          {closeClassName !== undefined && (
            <DialogPrimitive.DialogClose className={closeClassName}>
              <XIcon aria-hidden className={closeIconClassName} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.DialogClose>
          )}
        </DialogPrimitive.DialogContent>
      </LoadedPartsContext.Provider>
    </DialogPrimitive.Dialog>
  )
}

export default DialogPopup
