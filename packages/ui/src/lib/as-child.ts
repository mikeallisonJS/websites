import * as React from 'react'

// Radix's `asChild` merged a part's props into its only child. ui-sdk does that
// with `render`, and props on the render element win, as the child's did.
function asChildProps(asChild: boolean | undefined, children: React.ReactNode) {
  return asChild && React.isValidElement(children)
    ? { render: children as React.ReactElement }
    : { children }
}

export { asChildProps }
