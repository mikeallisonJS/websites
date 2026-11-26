import type { OpenChangeDetails } from '@mikeallisonjs/ui/lib/lazy-popup'

// Radix let DialogContent's onEscapeKeyDown keep the popup open by calling
// preventDefault(). ui-sdk has already prevented that Escape's default, so the
// handler gets the event with its own record of preventDefault(), and an
// Escape it prevents cancels the close.
function escapePrevented(
  details: OpenChangeDetails & { cancel?: () => void },
  onEscapeKeyDown: ((event: KeyboardEvent) => void) | undefined
) {
  if (!onEscapeKeyDown || details.reason !== 'escape-key') return false
  const event = details.event as KeyboardEvent | undefined
  if (!event) return false
  let prevented = false
  onEscapeKeyDown(
    new Proxy(event, {
      get(target, key) {
        if (key === 'preventDefault') return () => void (prevented = true)
        if (key === 'defaultPrevented') return prevented
        const value: unknown = Reflect.get(target, key, target)
        return typeof value === 'function' ? value.bind(target) : value
      }
    })
  )
  if (prevented) details.cancel?.()
  return prevented
}

export { escapePrevented }
