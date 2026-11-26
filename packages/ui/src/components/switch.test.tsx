// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Label } from '@mikeallisonjs/ui/components/label'
import { Switch } from '@mikeallisonjs/ui/components/switch'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Setting(props: React.ComponentProps<typeof Switch>) {
  return (
    <form data-testid="form">
      <Switch id="show-author" {...props} />
      <Label htmlFor="show-author">Show author</Label>
    </form>
  )
}

const form = () => screen.getByTestId('form') as HTMLFormElement

describe('Switch', () => {
  test('keeps its id, so a <Label htmlFor> names it and a press on it toggles once', async () => {
    const user = userEvent.setup()
    render(<Setting defaultChecked />)
    await settle()
    const control = screen.getByRole('switch', { name: 'Show author' })
    expect(control.id).toBe('show-author')
    expect(control.getAttribute('aria-checked')).toBe('true')
    await user.click(screen.getByText('Show author'))
    expect(control.getAttribute('aria-checked')).toBe('false')
    expect(control.hasAttribute('data-unchecked')).toBe(true)
    const thumb = control.querySelector('[data-slot="switch-thumb"]')
    expect(thumb?.hasAttribute('data-unchecked')).toBe(true)
  })

  test('Space toggles it, and onCheckedChange gets only a boolean', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Setting onCheckedChange={onCheckedChange} />)
    await settle()
    const control = screen.getByRole('switch', { name: 'Show author' })
    control.focus()
    await user.keyboard(' ')
    expect(control.getAttribute('aria-checked')).toBe('true')
    expect(
      control
        .querySelector('[data-slot="switch-thumb"]')
        ?.hasAttribute('data-checked')
    ).toBe(true)
    expect(onCheckedChange.mock.calls).toEqual([[true]])
  })

  test('a controlled switch follows its checked prop', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    const { rerender } = render(
      <Setting checked={false} onCheckedChange={onCheckedChange} />
    )
    await settle()
    const control = screen.getByRole('switch')
    await user.click(control)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(control.getAttribute('aria-checked')).toBe('false')
    rerender(<Setting checked onCheckedChange={onCheckedChange} />)
    expect(control.getAttribute('aria-checked')).toBe('true')
  })

  test('submits its name and value with FormData while on, and resets', async () => {
    const user = userEvent.setup()
    render(<Setting name="digest" value="weekly" defaultChecked />)
    await settle()
    expect(new FormData(form()).get('digest')).toBe('weekly')
    await user.click(screen.getByRole('switch'))
    expect(new FormData(form()).has('digest')).toBe(false)
    act(() => form().reset())
    await settle()
    expect(new FormData(form()).get('digest')).toBe('weekly')
  })

  test('required blocks the form until it is on', async () => {
    const user = userEvent.setup()
    render(<Setting name="agree" required />)
    await settle()
    expect(form().checkValidity()).toBe(false)
    await user.click(screen.getByRole('switch'))
    expect(form().checkValidity()).toBe(true)
  })

  test('disabled cannot change and submits nothing', async () => {
    const user = userEvent.setup()
    render(<Setting name="agree" defaultChecked disabled />)
    await settle()
    const control = screen.getByRole('switch')
    expect(control).toHaveProperty('disabled', true)
    await user.click(control)
    expect(control.getAttribute('aria-checked')).toBe('true')
    expect(new FormData(form()).has('agree')).toBe(false)
  })
})
