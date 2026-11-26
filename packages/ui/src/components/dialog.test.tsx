// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@mikeallisonjs/ui/components/dialog'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// Counts loads of the chunk with ui-sdk's dialog in it.
const chunk = vi.hoisted(() => ({ loads: 0 }))
vi.mock('@mikeallisonjs/ui/components/dialog-popup', async (importOriginal) => {
  chunk.loads++
  return importOriginal()
})

function Merge({
  showCloseButton,
  ...props
}: React.ComponentProps<typeof Dialog> & { showCloseButton?: boolean }) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="outline">Merge Tags</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle>Merge tags</DialogTitle>
          <DialogDescription>Pick the tag to keep</DialogDescription>
        </DialogHeader>
        <input aria-label="Keep" />
        <DialogFooter>
          <DialogClose asChild>
            <a href="#cancel">Cancel</a>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  // First, before any other test loads the chunk.
  test('loads ui-sdk only once the trigger is hovered, and opens a named dialog', async () => {
    const user = userEvent.setup()
    render(<Merge />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Merge Tags' })
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(trigger.getAttribute('data-slot')).toBe('dialog-trigger')
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.className).toContain('border')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(chunk.loads).toBe(0)
    await user.hover(trigger)
    await settle()
    expect(chunk.loads).toBe(1)
    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: 'Merge tags' })
    expect(chunk.loads).toBe(1)
    expect(dialog.getAttribute('aria-describedby')).toBe(
      screen.getByText('Pick the tag to keep').id
    )
    expect(dialog.className).toContain('sm:max-w-[425px]')
    expect(document.activeElement).toBe(
      screen.getByRole('textbox', { name: 'Keep' })
    )
  })

  test('Escape closes it and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<Merge />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Merge Tags' })
    trigger.focus()
    await user.keyboard('{Enter}')
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('onEscapeKeyDown can keep it open, as in Radix', async () => {
    const user = userEvent.setup()
    let dirty = true
    const onOpenChange = vi.fn()
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent
          onEscapeKeyDown={(event) => {
            expect(event.key).toBe('Escape')
            if (dirty) event.preventDefault()
          }}
        >
          <DialogTitle>Edit post</DialogTitle>
          <input aria-label="Post" />
        </DialogContent>
      </Dialog>
    )
    await settle()
    screen.getByRole('textbox', { name: 'Post' }).focus()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(onOpenChange).not.toHaveBeenCalled()
    dirty = false
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  test("a Close beside a nested dialog's content closes only that dialog", async () => {
    const user = userEvent.setup()
    render(
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Account</DialogTitle>
          {/* Non-modal, so pressing Close outside it isn't an outside press. */}
          <Dialog modal={false}>
            <DialogTrigger>Change password</DialogTrigger>
            <DialogClose>Close password</DialogClose>
            <DialogContent showCloseButton={false}>
              <DialogTitle>Password</DialogTitle>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Change password' }))
    await settle()
    expect(screen.getByRole('dialog', { name: 'Password' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Close password' }))
    await settle()
    expect(screen.queryByRole('dialog', { name: 'Password' })).toBeNull()
    expect(screen.getByRole('dialog', { name: 'Account' })).toBeTruthy()
  })

  test('the close button and an asChild DialogClose close it', async () => {
    const user = userEvent.setup()
    render(<Merge defaultOpen />)
    await settle()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Merge Tags' }))
    await settle()
    const cancel = screen.getByRole('link', { name: 'Cancel' })
    expect(cancel.tagName).toBe('A')
    expect(cancel.getAttribute('data-slot')).toBe('dialog-close')
    await user.click(cancel)
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  test('showCloseButton={false} leaves the close button out', async () => {
    render(<Merge defaultOpen showCloseButton={false} />)
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull()
  })

  test('a controlled dialog asks its parent, which owns open', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <Merge open={false} onOpenChange={onOpenChange} />
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Merge Tags' }))
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything())
    expect(screen.queryByRole('dialog')).toBeNull()
    rerender(<Merge open onOpenChange={onOpenChange} />)
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    await user.keyboard('{Escape}')
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything())
    expect(screen.getByRole('dialog')).toBeTruthy()
    rerender(<Merge open={false} onOpenChange={onOpenChange} />)
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  test('it dims the page with a backdrop, and pressing it closes', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Merge defaultOpen onOpenChange={onOpenChange} />)
    await settle()
    const backdrop = document.querySelector<HTMLElement>(
      '[data-slot=dialog-backdrop]'
    )
    expect(backdrop?.className).toContain('bg-black/50')
    await user.click(backdrop!)
    await settle()
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })
})

describe('Dialog inside a form', () => {
  test("its buttons don't join or submit the surrounding form", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form aria-label="Plugin" onSubmit={onSubmit}>
        <Dialog>
          <DialogTrigger>Search images</DialogTrigger>
          <DialogTrigger asChild>
            <button>Search icons</button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Image search</DialogTitle>
            <Button>Cancel</Button>
          </DialogContent>
        </Dialog>
      </form>
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Search images' }))
    await settle()
    const form = screen.getByRole('form', { name: 'Plugin' })
    expect(form.contains(screen.getByRole('dialog'))).toBe(false)
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Search icons' }))
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
