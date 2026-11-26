// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Toggle } from '@mikeallisonjs/ui/components/toggle'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('Toggle', () => {
  test('a controlled toggle driven by onClick, as the player uses it', async () => {
    const user = userEvent.setup()
    function Shuffle() {
      const [shuffled, setShuffled] = React.useState(false)
      return (
        <Toggle
          aria-label="Shuffle"
          value="shuffle"
          pressed={shuffled}
          className="grow-1"
          onClick={() => setShuffled(!shuffled)}
        >
          S
        </Toggle>
      )
    }
    render(<Shuffle />)
    await settle()
    const toggle = screen.getByRole('button', { name: 'Shuffle' })
    expect(toggle.getAttribute('aria-pressed')).toBe('false')
    expect(toggle.getAttribute('type')).toBe('button')
    expect(toggle.className).toContain('grow-1')
    expect(toggle.className).toContain('data-pressed:bg-accent')
    await user.click(toggle)
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
    expect(toggle.hasAttribute('data-pressed')).toBe(true)
    await user.keyboard('{Enter}')
    expect(toggle.getAttribute('aria-pressed')).toBe('false')
  })

  test('the parent owns a controlled toggle', async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle aria-label="Repeat" pressed onPressedChange={onPressedChange} />
    )
    await settle()
    const toggle = screen.getByRole('button', { name: 'Repeat' })
    await user.click(toggle)
    expect(onPressedChange).toHaveBeenCalledWith(false)
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
  })

  test('uncontrolled, it flips itself and reports the new state', async () => {
    const user = userEvent.setup()
    const onPressedChange = vi.fn()
    render(
      <Toggle variant="outline" size="sm" onPressedChange={onPressedChange}>
        Bold
      </Toggle>
    )
    await settle()
    const toggle = screen.getByRole('button', { name: 'Bold' })
    expect(toggle.className).toContain('border-input')
    expect(toggle.className).toContain('h-8')
    await user.click(toggle)
    expect(onPressedChange).toHaveBeenCalledWith(true)
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
  })
})
