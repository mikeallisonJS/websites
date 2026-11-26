// Shared setup for component tests. Import it first in a test file that starts
// with `// @vitest-environment jsdom`.
import { act, cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'

declare global {
  var __UI_SDK_STRICT__: boolean | undefined
}

// jsdom lacks the popover API, animations and layout that ui-sdk's popups use.
beforeAll(() => {
  globalThis.__UI_SDK_STRICT__ = true
  HTMLElement.prototype.showPopover = function () {}
  HTMLElement.prototype.hidePopover = function () {}
  Element.prototype.getAnimations = () => []
  Element.prototype.scrollIntoView = function () {}
  Element.prototype.checkVisibility = () => true
  Element.prototype.getClientRects = () => [] as unknown as DOMRectList
  document.elementFromPoint = () => null
  document.elementsFromPoint = () => []
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  document.head.append(
    Object.assign(document.createElement('style'), {
      textContent: '[popover] { display: block !important }'
    })
  )
})

afterEach(cleanup)

// Some ui-sdk state, like focus moving into an opened popup, lands a tick later.
const settle = () => act(() => new Promise((r) => setTimeout(r, 0)))

export { settle }
