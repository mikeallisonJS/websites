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

// Each root starts a fresh LoadedPartsContext, so a Close beside a nested
// popup's content closes that popup, not the loaded one around it.
function LazyRootProvider({
  root,
  children
}: {
  root: LazyRoot
  children?: React.ReactNode
}) {
  return React.createElement(
    LazyRootContext.Provider,
    { value: root },
    React.createElement(LoadedPartsContext.Provider, { value: null }, children)
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

// A popup chunk that fails to load (offline, or a deployment that removed it)
// closes the popup and loads again on the next open, instead of
// reaching the page's error boundary. React.lazy keeps a failed load, so a
// retry needs a new lazy component.
class PopupLoadError extends Error {}

function createLazyPopup<P extends { root: LazyRoot }>(
  load: () => Promise<{ default: React.ComponentType<P> }>
) {
  const loadOnce = () =>
    load().catch((error: unknown) => {
      throw new PopupLoadError('A popup failed to load', { cause: error })
    })
  let Lazy = React.lazy(loadOnce)
  // Loading ahead of an open is a hint, so its failure is left to the open.
  const preload = () => void load().catch(() => {})

  type BoundaryProps = { popup: P }
  class Boundary extends React.Component<
    BoundaryProps,
    { error: unknown; failed: boolean }
  > {
    state = { error: undefined as unknown, failed: false }
    static getDerivedStateFromError(error: unknown) {
      return { error, failed: true }
    }
    componentDidCatch(error: unknown) {
      // React logs the error it caught.
      if (!(error instanceof PopupLoadError)) return
      Lazy = React.lazy(loadOnce)
      this.props.popup.root.setOpen(false, { reason: 'load-error' })
    }
    componentDidUpdate(previous: BoundaryProps) {
      const { open } = this.props.popup.root
      if (this.state.failed && open && !previous.popup.root.open) {
        this.setState({ error: undefined, failed: false })
      }
    }
    render() {
      if (!this.state.failed) {
        return React.createElement(
          React.Suspense,
          { fallback: null },
          React.createElement(Lazy as React.ComponentType<P>, this.props.popup)
        )
      }
      // Anything else the content throws is the page's to handle.
      if (!(this.state.error instanceof PopupLoadError)) throw this.state.error
      return null
    }
  }

  // A function component, so `ref` reaches the popup's content.
  function Popup(props: P) {
    return React.createElement(Boundary, { popup: props })
  }

  return { preload, Popup }
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
  preload: () => void,
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
  return renderElement(
    'button',
    {
      // As Radix did, also for an asChild child; a type on the child wins.
      type: 'button',
      'data-slot': slot,
      'aria-haspopup': 'dialog',
      // As in ui-sdk: a modal's trigger is inert while it's open, so
      // aria-expanded would only ever say "collapsed".
      'aria-expanded': root.modal === true ? undefined : root.open,
      'data-open': root.open ? '' : undefined,
      'data-closed': root.open ? undefined : '',
      ref: mergeRefs(root.triggerRef, ref),
      onPointerEnter: chain(onPointerEnter, preload),
      onPointerDown: chain(onPointerDown, preload),
      onFocus: chain(onFocus, preload),
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
      type: 'button',
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
  createLazyPopup,
  LazyRootProvider,
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
