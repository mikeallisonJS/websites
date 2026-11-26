// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@mikeallisonjs/ui/components/sheet'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// Counts loads of the chunk with ui-sdk's dialog in it.
const chunk = vi.hoisted(() => ({ loads: 0 }))
vi.mock('@mikeallisonjs/ui/components/dialog-popup', async (importOriginal) => {
  chunk.loads++
  return importOriginal()
})

// The shape of captainofbass.com's mobile nav: controlled, with links that
// close it.
function MobileNav({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <a href="/">Logo</a>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription>Pages on this site</SheetDescription>
        <a
          href="/music"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/music')
            setOpen(false)
          }}
        >
          MUSIC
        </a>
      </SheetContent>
    </Sheet>
  )
}

describe('Sheet', () => {
  // First, before any other test loads the chunk.
  test('loads ui-sdk only once the trigger is focused', async () => {
    const user = userEvent.setup()
    render(<MobileNav onNavigate={vi.fn()} />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Toggle Menu' })
    expect(trigger.getAttribute('data-slot')).toBe('sheet-trigger')
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog')
    expect(trigger.className).toContain('md:hidden')
    expect(chunk.loads).toBe(0)
    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(trigger)
    await settle()
    expect(chunk.loads).toBe(1)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  test('opens a named modal sheet against its side, in the body', async () => {
    const user = userEvent.setup()
    const { container } = render(<MobileNav onNavigate={vi.fn()} />)
    await settle()
    await user.click(screen.getByRole('button', { name: 'Toggle Menu' }))
    const sheet = await screen.findByRole('dialog', { name: 'Menu' })
    expect(sheet.getAttribute('aria-modal')).toBe('true')
    expect(sheet.getAttribute('data-side')).toBe('right')
    expect(sheet.className).toContain('right-0')
    expect(sheet.className).toContain('slide-in-from-right')
    expect(sheet.className).toContain('pr-0')
    expect(sheet.getAttribute('aria-describedby')).toBe(
      screen.getByText('Pages on this site').id
    )
    expect(container.contains(sheet)).toBe(false)
    expect(
      document.querySelector('[data-slot=dialog-backdrop]')?.className
    ).toContain('bg-black/50')
  })

  test('a link that closes it navigates, and Escape returns focus to the trigger', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<MobileNav onNavigate={onNavigate} />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Toggle Menu' })
    await user.click(trigger)
    await user.click(await screen.findByRole('link', { name: 'MUSIC' }))
    await settle()
    expect(onNavigate).toHaveBeenCalledWith('/music')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    trigger.focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('focus returns to the trigger even when the click never focused it', async () => {
    // Safari doesn't focus a button on click, so ui-sdk's fallback, the
    // element focused before opening, would be the page.
    const user = userEvent.setup()
    render(<MobileNav onNavigate={vi.fn()} />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Toggle Menu' })
    fireEvent.click(trigger)
    expect(document.activeElement).toBe(document.body)
    await screen.findByRole('dialog')
    await settle()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('the close button and SheetClose close it', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Sheet defaultOpen onOpenChange={onOpenChange}>
        <SheetContent side="left">
          <SheetTitle>Filters</SheetTitle>
          <SheetClose>Done</SheetClose>
        </SheetContent>
      </Sheet>
    )
    const sheet = await screen.findByRole('dialog', { name: 'Filters' })
    expect(sheet.className).toContain('left-0')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything())
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
