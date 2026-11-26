// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@mikeallisonjs/ui/components/drawer'
import { Toggle } from '@mikeallisonjs/ui/components/toggle'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// Counts loads of the chunk with ui-sdk's drawer in it.
const chunk = vi.hoisted(() => ({ loads: 0 }))
vi.mock('@mikeallisonjs/ui/components/drawer-popup', async (importOriginal) => {
  chunk.loads++
  return importOriginal()
})

// The shape of captainofbass.com's music player: a toggle in the player bar
// opens a non-modal playlist drawer, and the store owns `open`.
function Player({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = React.useState(false)
  const [played, setPlayed] = React.useState(0)
  return (
    <div>
      <audio data-testid="audio" />
      <button type="button" onClick={() => setPlayed(played + 1)}>
        Play
      </button>
      <Toggle
        aria-label="Show playlist"
        pressed={open}
        onClick={() => setOpen(!open)}
      />
      <Drawer
        open={open}
        onClose={() => {
          onClose?.()
          setOpen(false)
        }}
        modal={false}
      >
        <DrawerContent className="md:mb-[62px]">
          <DrawerTitle>Playlist</DrawerTitle>
          <button type="button" onClick={() => setOpen(false)}>
            Track 2
          </button>
        </DrawerContent>
      </Drawer>
      <output>{played}</output>
    </div>
  )
}

describe('Drawer', () => {
  // First, before any other test loads the chunk.
  test('loads ui-sdk on first open, not with the page', async () => {
    const user = userEvent.setup()
    render(<Player />)
    await settle()
    expect(chunk.loads).toBe(0)
    expect(document.querySelector('[data-slot=drawer-content]')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Show playlist' }))
    const drawer = await screen.findByRole('dialog', { name: 'Playlist' })
    expect(chunk.loads).toBe(1)
    expect(drawer.className).toContain('md:mb-[62px]')
    expect(drawer.getAttribute('data-side')).toBe('bottom')
  })

  test('non-modal: no backdrop, the page stays usable and focus stays put', async () => {
    const user = userEvent.setup()
    const { container } = render(<Player />)
    await settle()
    const toggle = screen.getByRole('button', { name: 'Show playlist' })
    const audio = screen.getByTestId('audio')
    await user.click(toggle)
    const drawer = await screen.findByRole('dialog', { name: 'Playlist' })
    await settle()
    expect(drawer.hasAttribute('aria-modal')).toBe(false)
    expect(document.querySelector('[data-slot=drawer-backdrop]')).toBeNull()
    expect(document.activeElement).toBe(toggle)
    expect(container.closest('[inert]')).toBeNull()
    // The player bar behind it still takes presses.
    await user.click(screen.getByRole('button', { name: 'Play' }))
    expect(screen.getByText('1')).toBeTruthy()
    // The toggle closes it again; the audio element was never remounted.
    await user.click(toggle)
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByTestId('audio')).toBe(audio)
    expect(document.activeElement).toBe(toggle)
  })

  test('Escape closes it from outside, and onClose runs for its own closes only', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Player onClose={onClose} />)
    await settle()
    const toggle = screen.getByRole('button', { name: 'Show playlist' })
    await user.click(toggle)
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(toggle)
    // Closed by its parent: no onClose, as with vaul.
    await user.click(toggle)
    await user.click(await screen.findByRole('button', { name: 'Track 2' }))
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('a modal drawer with a trigger dims the page and returns focus on close', async () => {
    const user = userEvent.setup()
    render(
      <Drawer>
        <DrawerTrigger>Filters</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerClose>Done</DrawerClose>
        </DrawerContent>
      </Drawer>
    )
    await settle()
    const trigger = screen.getByRole('button', { name: 'Filters' })
    expect(trigger.getAttribute('data-slot')).toBe('drawer-trigger')
    await user.click(trigger)
    const drawer = await screen.findByRole('dialog', { name: 'Filters' })
    expect(drawer.getAttribute('aria-modal')).toBe('true')
    expect(document.querySelector('[data-slot=drawer-backdrop]')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Done' }))
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })
})
