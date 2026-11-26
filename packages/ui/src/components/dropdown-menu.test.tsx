// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@mikeallisonjs/ui/components/dropdown-menu'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function ModeToggle({
  setTheme = () => {},
  onSelect,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & {
  setTheme?: (theme: string) => void
  onSelect?: (event: Event) => void
}) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} onSelect={onSelect}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

async function openWithKeyboard(user: ReturnType<typeof userEvent.setup>) {
  const trigger = screen.getByRole('button', { name: 'Toggle theme' })
  trigger.focus()
  await user.keyboard('{Enter}')
  await settle()
  return trigger
}

describe('DropdownMenu', () => {
  test('an asChild trigger renders the child alone and opens the menu', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Toggle theme' })
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(trigger.getAttribute('data-slot')).toBe('menu-trigger')
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    await user.click(trigger)
    await settle()
    expect(screen.getByRole('menu')).toBeTruthy()
    expect(screen.getAllByRole('menuitem')).toHaveLength(3)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  test('clicking an item runs its onClick, closes, and returns focus', async () => {
    const user = userEvent.setup()
    const setTheme = vi.fn()
    render(<ModeToggle setTheme={setTheme} />)
    await settle()
    const trigger = await openWithKeyboard(user)
    await user.click(screen.getByRole('menuitem', { name: 'System' }))
    await settle()
    expect(setTheme).toHaveBeenCalledExactlyOnceWith('system')
    expect(screen.queryByRole('menu')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('Enter and Space on an item run its onClick and onSelect once', async () => {
    const user = userEvent.setup()
    const setTheme = vi.fn()
    const onSelect = vi.fn()
    render(<ModeToggle setTheme={setTheme} onSelect={onSelect} />)
    await settle()
    const trigger = await openWithKeyboard(user)
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'Light' })
    )
    await user.keyboard('{ArrowDown}{Enter}')
    await settle()
    expect(setTheme).toHaveBeenCalledExactlyOnceWith('dark')
    expect(onSelect).toHaveBeenCalledOnce()
    expect(screen.queryByRole('menu')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    await openWithKeyboard(user)
    await user.keyboard('{End}{ }')
    await settle()
    expect(setTheme).toHaveBeenLastCalledWith('system')
    expect(setTheme).toHaveBeenCalledTimes(2)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  test('onSelect that prevents default keeps the menu open', async () => {
    const user = userEvent.setup()
    render(<ModeToggle onSelect={(event) => event.preventDefault()} />)
    await settle()
    await openWithKeyboard(user)
    await user.click(screen.getByRole('menuitem', { name: 'Dark' }))
    await settle()
    expect(screen.getByRole('menu')).toBeTruthy()
  })

  test('Escape closes it and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)
    await settle()
    const trigger = await openWithKeyboard(user)
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('menu')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('a controlled menu asks its parent, which owns open', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <ModeToggle open={false} onOpenChange={onOpenChange} />
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Toggle theme' }))
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything())
    expect(screen.queryByRole('menu')).toBeNull()
    rerender(<ModeToggle open onOpenChange={onOpenChange} />)
    await settle()
    expect(screen.getByRole('menu')).toBeTruthy()
  })

  test('the user menu: a Portal, a Label outside a group, a group and a separator', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Profile">
          <svg />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onClick}>
                Download history
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Profile' }))
    await settle()
    expect(screen.getByRole('menu').className).toContain('w-48')
    expect(screen.getByRole('group')).toBeTruthy()
    expect(screen.getByRole('separator')).toBeTruthy()
    await user.click(screen.getByRole('menuitem', { name: 'Download history' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('a submenu opens from the keyboard and its items run', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Category</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Synths</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={onClick}>All Synths</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await settle()
    screen.getByRole('button', { name: 'Category' }).focus()
    await user.keyboard('{Enter}')
    await settle()
    const subTrigger = screen.getByRole('menuitem', { name: 'Synths' })
    expect(subTrigger.getAttribute('aria-haspopup')).toBe('menu')
    await user.keyboard('{ArrowRight}')
    await settle()
    expect(subTrigger.hasAttribute('data-open')).toBe(true)
    expect(document.activeElement).toBe(
      screen.getByRole('menuitem', { name: 'All Synths' })
    )
    await user.keyboard('{Enter}')
    await settle()
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.queryByRole('menu')).toBeNull()
  })

  test('checkbox and radio items report changes and close, as Radix did', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    const onValueChange = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="top" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await settle()
    const trigger = screen.getByRole('button', { name: 'View' })
    await user.click(trigger)
    await settle()
    await user.click(
      screen.getByRole('menuitemcheckbox', { name: 'Status bar' })
    )
    await settle()
    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(
      true,
      expect.anything()
    )
    expect(screen.queryByRole('menu')).toBeNull()
    await user.click(trigger)
    await settle()
    expect(
      screen
        .getByRole('menuitemradio', { name: 'Top' })
        .getAttribute('aria-checked')
    ).toBe('true')
    await user.click(screen.getByRole('menuitemradio', { name: 'Bottom' }))
    await settle()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith(
      'bottom',
      expect.anything()
    )
    expect(screen.queryByRole('menu')).toBeNull()
  })
})
