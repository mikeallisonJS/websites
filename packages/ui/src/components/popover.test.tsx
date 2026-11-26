// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger
} from '@mikeallisonjs/ui/components/popover'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function AuthorFilter(props: React.ComponentProps<typeof Popover>) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Author"
          aria-expanded={props.open}
        >
          All Authors
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <input aria-label="Search author" />
      </PopoverContent>
    </Popover>
  )
}

describe('Popover', () => {
  test('an asChild trigger keeps its own role and opens the content', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter />)
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Author' })
    expect(trigger.tagName).toBe('BUTTON')
    expect(trigger.getAttribute('data-slot')).toBe('popover-trigger')
    expect(screen.getAllByRole('combobox')).toHaveLength(1)
    await user.click(trigger)
    await settle()
    const content = screen.getByRole('dialog', { name: 'Author' })
    expect(content.className).toContain('w-[200px]')
    expect(content.className).not.toContain('w-72')
    expect(document.activeElement).toBe(
      screen.getByRole('textbox', { name: 'Search author' })
    )
  })

  test('Escape closes it and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter />)
    await settle()
    const trigger = screen.getByRole('combobox')
    await user.click(trigger)
    await settle()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('a controlled popover asks its parent, which owns open', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <AuthorFilter open={false} onOpenChange={onOpenChange} />
    )
    await settle()
    const trigger = screen.getByRole('combobox')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    await user.click(trigger)
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything())
    expect(screen.queryByRole('dialog')).toBeNull()
    rerender(<AuthorFilter open onOpenChange={onOpenChange} />)
    await settle()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    await user.click(trigger)
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything())
  })

  test('PopoverAnchor positions the content instead of the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverAnchor data-testid="anchor" />
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Hi</PopoverContent>
      </Popover>
    )
    await settle()
    const anchor = screen.getByTestId('anchor')
    anchor.getBoundingClientRect = () => new DOMRect(300, 200, 50, 20)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await settle()
    const content = screen.getByRole('dialog', { name: 'Open' })
    expect(content.style.getPropertyValue('--anchor-width')).toBe('50px')
  })
})
