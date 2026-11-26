import * as React from 'react'

const noop = () => () => {}

// ui-sdk renders popups where they sit in the tree. Radix portaled them to the
// body, and callers rely on that: a dialog inside a <form> must not join it
// (its buttons would submit the form), and `space-y-*` siblings must not shift.
// Null on the server and during hydration renders in place, so markup matches.
function usePopupContainer() {
  return React.useSyncExternalStore(
    noop,
    () => document.body,
    () => null
  )
}

export { usePopupContainer }
