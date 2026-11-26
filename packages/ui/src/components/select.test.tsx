// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@mikeallisonjs/ui/components/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@mikeallisonjs/ui/components/select'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Status(props: React.ComponentProps<typeof Select>) {
  return (
    <>
      <label htmlFor="status">Status</label>
      <Select {...props}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="archived" disabled>
            Archived
          </SelectItem>
          <SelectItem value="blacklisted">Blacklisted</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}

describe('Select', () => {
  test('a <Label htmlFor> names the trigger, which shows the placeholder', async () => {
    render(<Status />)
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Status' })
    expect(trigger.id).toBe('status')
    expect(trigger).toHaveProperty('textContent', 'Select status')
    expect(trigger.hasAttribute('data-placeholder')).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  test('keyboard opens, skips disabled items, chooses and returns focus', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Status onValueChange={onValueChange} />)
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Status' })
    trigger.focus()
    await user.keyboard('{ArrowDown}')
    await settle()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(document.activeElement).toBe(
      screen.getByRole('option', { name: 'Published' })
    )
    expect(
      screen
        .getByRole('option', { name: 'Archived' })
        .getAttribute('aria-disabled')
    ).toBe('true')
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(
      screen.getByRole('option', { name: 'Blacklisted' })
    )
    await user.keyboard('{Enter}')
    await settle()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('blacklisted')
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(trigger.textContent).toBe('Blacklisted')
    expect(trigger.hasAttribute('data-placeholder')).toBe(false)
  })

  test('Escape closes without choosing and returns focus', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Status defaultValue="published" onValueChange={onValueChange} />)
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Status' })
    trigger.focus()
    await user.keyboard('{Enter}')
    await settle()
    expect(document.activeElement).toBe(
      screen.getByRole('option', { name: 'Published' })
    )
    await user.keyboard('{End}{Escape}')
    await settle()
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(document.activeElement).toBe(trigger)
    expect(onValueChange).not.toHaveBeenCalled()
    expect(trigger.textContent).toBe('Published')
  })

  test('Escape inside a Dialog closes only the select', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Merge</DialogTitle>
          <DialogDescription>Pick one to keep</DialogDescription>
          <Status />
        </DialogContent>
      </Dialog>
    )
    // The dialog's ui-sdk code loads with its content.
    const trigger = await screen.findByRole('combobox', { name: 'Status' })
    await user.click(trigger)
    await settle()
    expect(screen.getByRole('listbox')).toBeTruthy()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(onOpenChange).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(trigger)
    await user.keyboard('{Escape}')
    await settle()
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  })

  test('typing on the closed trigger selects the next match', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Status onValueChange={onValueChange} />)
    await settle()
    screen.getByRole('combobox', { name: 'Status' }).focus()
    await user.keyboard('b')
    await settle()
    expect(onValueChange).toHaveBeenCalledWith('blacklisted')
  })

  test("a controlled '' shows the placeholder, and the parent owns the value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Status value="" onValueChange={onValueChange} />
    )
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Status' })
    expect(trigger.textContent).toBe('Select status')
    await user.click(trigger)
    await settle()
    await user.click(screen.getByRole('option', { name: 'Published' }))
    await settle()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('published')
    expect(trigger.textContent).toBe('Select status')
    rerender(<Status value="published" onValueChange={onValueChange} />)
    await settle()
    expect(trigger.textContent).toBe('Published')
  })

  test("the trigger shows the chosen item's own content, not just its text", async () => {
    render(
      <Select defaultValue="rating">
        <SelectTrigger aria-label="Sort">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">
            <div>
              <svg data-testid="star" />
              <span>Highest Rated</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    )
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Sort' })
    expect(trigger.textContent).toBe('Highest Rated')
    expect(screen.getByTestId('star')).toBeTruthy()
  })

  test('SelectLabel names its group', async () => {
    const user = userEvent.setup()
    render(
      <Select>
        <SelectTrigger aria-label="Font">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Serif</SelectLabel>
            <SelectItem value="georgia">Georgia</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
    await settle()
    await user.click(screen.getByRole('combobox', { name: 'Font' }))
    await settle()
    expect(screen.getByRole('group', { name: 'Serif' })).toBeTruthy()
  })

  test('the value submits under its name, and a form reset restores the default', async () => {
    const user = userEvent.setup()
    render(
      <form data-testid="form">
        <Status name="status" defaultValue="published" />
      </form>
    )
    await settle()
    const form = screen.getByTestId('form') as HTMLFormElement
    expect(new FormData(form).get('status')).toBe('published')
    await user.click(screen.getByRole('combobox', { name: 'Status' }))
    await settle()
    await user.click(screen.getByRole('option', { name: 'Blacklisted' }))
    await settle()
    expect(new FormData(form).get('status')).toBe('blacklisted')
    act(() => form.reset())
    await settle()
    expect(new FormData(form).get('status')).toBe('published')
  })

  test("a reset to no value reports '' rather than null", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <form data-testid="form">
        <Status name="status" onValueChange={onValueChange} />
      </form>
    )
    await settle()
    await user.click(screen.getByRole('combobox', { name: 'Status' }))
    await settle()
    await user.click(screen.getByRole('option', { name: 'Published' }))
    await settle()
    act(() => (screen.getByTestId('form') as HTMLFormElement).reset())
    await settle()
    expect(onValueChange).toHaveBeenLastCalledWith('')
    expect(screen.getByRole('combobox', { name: 'Status' }).textContent).toBe(
      'Select status'
    )
  })

  test('a disabled select does not open', async () => {
    const user = userEvent.setup()
    render(<Status disabled />)
    await settle()
    const trigger = screen.getByRole('combobox', { name: 'Status' })
    expect(trigger.hasAttribute('disabled')).toBe(true)
    await user.click(trigger)
    await settle()
    expect(screen.queryByRole('listbox')).toBeNull()
  })
})
