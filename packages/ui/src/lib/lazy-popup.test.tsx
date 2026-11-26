// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  createLazyPopup,
  LazyRootProvider,
  renderLazyTrigger,
  useLazyRoot,
  useLazyRootContext,
  type LazyRoot
} from '@mikeallisonjs/ui/lib/lazy-popup'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Loaded({ root }: { root: LazyRoot }) {
  return root.open ? <div role="dialog" aria-label="Loaded" /> : null
}

function harness(load: () => Promise<{ default: typeof Loaded }>) {
  const { preload, Popup } = createLazyPopup(load)
  function Content() {
    const root = useLazyRootContext('Content')
    return root.mounted ? <Popup root={root} /> : null
  }
  function Trigger() {
    const root = useLazyRootContext('Trigger')
    return renderLazyTrigger(root, 'trigger', preload, { children: 'Open' })
  }
  return function Harness({
    onOpenChange
  }: {
    onOpenChange?: (open: boolean, details: { reason: string }) => void
  }) {
    const root = useLazyRoot({ onOpenChange })
    return (
      <LazyRootProvider root={root}>
        <Trigger />
        <Content />
      </LazyRootProvider>
    )
  }
}

describe('createLazyPopup', () => {
  test('a chunk that fails to load closes the popup and loads again on the next open', async () => {
    const user = userEvent.setup()
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    let offline = true
    const Harness = harness(() =>
      offline
        ? Promise.reject(new Error('Failed to fetch chunk'))
        : Promise.resolve({ default: Loaded })
    )
    const onOpenChange = vi.fn()
    render(<Harness onOpenChange={onOpenChange} />)
    const trigger = screen.getByRole('button', { name: 'Open' })
    // The preloads on hover and press fail quietly; the open's load fails.
    await user.click(trigger)
    await vi.waitFor(() =>
      expect(onOpenChange).toHaveBeenLastCalledWith(false, {
        reason: 'load-error'
      })
    )
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(trigger.getAttribute('data-closed')).toBe('')
    expect(error).toHaveBeenCalled()
    offline = false
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Loaded' })).toBeTruthy()
    error.mockRestore()
  })

  test("an error the popup's content throws still reaches the page", async () => {
    const user = userEvent.setup()
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Broken(): React.ReactNode {
      throw new Error('content bug')
    }
    const Harness = harness(() =>
      Promise.resolve({ default: Broken as unknown as typeof Loaded })
    )
    class Page extends React.Component<
      { children: React.ReactNode },
      { error?: Error }
    > {
      state: { error?: Error } = {}
      static getDerivedStateFromError(error: Error) {
        return { error }
      }
      render() {
        return this.state.error ? (
          <p>Page caught {this.state.error.message}</p>
        ) : (
          this.props.children
        )
      }
    }
    render(
      <Page>
        <Harness />
      </Page>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await settle()
    expect(await screen.findByText('Page caught content bug')).toBeTruthy()
    error.mockRestore()
  })
})
