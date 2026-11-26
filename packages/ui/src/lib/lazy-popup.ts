'use client'

import { renderElement } from '@ui-sdk/react/primitive'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'

// ui-sdk's popups share an engine for focus, dismissal, motion and the top
// layer that costs ~35–45 KB gzip. Dialog, Sheet and Drawer sit in layouts, so
// their roots, triggers and close buttons stay light, and the content loads the
// ui-sdk popup from its own chunk on first open, or earlier when a trigger is
// hovered, pressed or focused. Once loaded, the popup stays mounted, so closing
// still animates and opening again is instant.

type OpenChangeDetails = { reason: string; event?: Event }

type LazyRootOptions = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, details: OpenChangeDetails) => void
  modal?: boolean | 'trap-focus'
}

type LazyRoot = {
  open: boolean
  // Whether it has opened since it mounted. The popup renders from then on.
  mounted: boolean
  setOpen: (open: boolean, details: OpenChangeDetails) => void
  modal: boolean | 'trap-focus'
  triggerRef: React.RefObject<HTMLElement | null>
  // Focus goes back to the trigger on close; without one, ui-sdk's own order.
  finalFocus: () => HTMLElement | null
}

const LazyRootContext = React.createContext<LazyRoot | null>(null)

function useLazyRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  modal = true
}: LazyRootOptions): LazyRoot {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolled
  const [mounted, setMounted] = React.useState(open)
  if (open && !mounted) setMounted(true)
  const triggerRef = React.useRef<HTMLElement>(null)
  const controlled = openProp !== undefined
  const onOpenChangeRef = React.useRef(onOpenChange)
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange
  })
  const setOpen = React.useCallback(
    (next: boolean, details: OpenChangeDetails) => {
      if (!controlled) setUncontrolled(next)
      onOpenChangeRef.current?.(next, details)
    },
    [controlled]
  )
  const finalFocus = React.useCallback(() => triggerRef.current, [])
  return React.useMemo(
    () => ({ open, mounted, setOpen, modal, triggerRef, finalFocus }),
    [open, mounted, setOpen, modal, finalFocus]
  )
}

function useLazyRootContext(part: string) {
  const root = React.useContext(LazyRootContext)
  if (!root) throw new Error(`${part} must be inside its root`)
  return root
}

// The ui-sdk parts a loaded popup hands to the light Title, Description and
// Close wrappers rendered inside it.
type LoadedParts = {
  Title: React.ElementType
  Description: React.ElementType
  Close: React.ElementType
}

const LoadedPartsContext = React.createContext<LoadedParts | null>(null)

// Title and Description render inside loaded content, so they take ui-sdk's
// parts from it, which name and describe the popup.
function LoadedPart({
  kind,
  fallback,
  ...props
}: {
  kind: 'Title' | 'Description'
  fallback: 'h2' | 'p'
} & React.HTMLAttributes<HTMLElement>) {
  const parts = React.useContext(LoadedPartsContext)
  return React.createElement(parts?.[kind] ?? fallback, props)
}

function chain<E>(...handlers: (((event: E) => void) | undefined)[]) {
  return (event: E) => {
    for (const handler of handlers) handler?.(event)
  }
}

type LightButtonProps = Omit<React.ComponentProps<'button'>, 'value'> & {
  asChild?: boolean
}

// A trigger that toggles the root and starts loading the popup on intent.
function renderLazyTrigger(
  root: LazyRoot,
  slot: string,
  preload: () => unknown,
  {
    asChild,
    children,
    ref,
    onClick,
    onPointerEnter,
    onPointerDown,
    onFocus,
    ...props
  }: LightButtonProps
) {
  const { render, ...content } = asChildProps(asChild, children)
  const load = () => void preload()
  return renderElement(
    'button',
    {
      type: render ? undefined : 'button',
      'data-slot': slot,
      'aria-haspopup': 'dialog',
      // As in ui-sdk: a modal's trigger is inert while it's open, so
      // aria-expanded would only ever say "collapsed".
      'aria-expanded': root.modal === true ? undefined : root.open,
      'data-open': root.open ? '' : undefined,
      'data-closed': root.open ? undefined : '',
      ref: mergeRefs(root.triggerRef, ref),
      onPointerEnter: chain(onPointerEnter, load),
      onPointerDown: chain(onPointerDown, load),
      onFocus: chain(onFocus, load),
      onClick: chain<React.MouseEvent<HTMLButtonElement>>(onClick, (event) => {
        if (event.defaultPrevented) return
        root.setOpen(!root.open, {
          reason: 'trigger-press',
          event: event.nativeEvent
        })
      }),
      ...props,
      ...content
    },
    render
  )
}

// Inside loaded content, ui-sdk's Close part; elsewhere a button that closes.
function renderLazyClose(
  root: LazyRoot,
  parts: LoadedParts | null,
  slot: string,
  { asChild, children, onClick, ...props }: LightButtonProps
) {
  if (parts) {
    return React.createElement(parts.Close, {
      onClick,
      ...props,
      ...asChildProps(asChild, children)
    })
  }
  const { render, ...content } = asChildProps(asChild, children)
  return renderElement(
    'button',
    {
      type: render ? undefined : 'button',
      'data-slot': slot,
      onClick: chain<React.MouseEvent<HTMLButtonElement>>(onClick, (event) => {
        if (event.defaultPrevented) return
        root.setOpen(false, {
          reason: 'close-press',
          event: event.nativeEvent
        })
      }),
      ...props,
      ...content
    },
    render
  )
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === 'function') return ref(node)
      if (ref) ref.current = node
      return undefined
    })
    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index]
        if (typeof cleanup === 'function') cleanup()
        else if (typeof ref === 'function') ref(null)
        else if (ref) ref.current = null
      })
    }
  }
}

export {
  LazyRootContext,
  LoadedPart,
  LoadedPartsContext,
  renderLazyClose,
  renderLazyTrigger,
  useLazyRoot,
  useLazyRootContext
}
export type {
  LazyRoot,
  LazyRootOptions,
  LightButtonProps,
  LoadedParts,
  OpenChangeDetails
}
