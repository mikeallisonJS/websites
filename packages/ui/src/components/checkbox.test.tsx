// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Checkbox } from '@mikeallisonjs/ui/components/checkbox'
import { Label } from '@mikeallisonjs/ui/components/label'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Terms(props: React.ComponentProps<typeof Checkbox>) {
  return (
    <form data-testid="form">
      <Checkbox id="terms" {...props} />
      <Label htmlFor="terms">Accept terms</Label>
    </form>
  )
}

const form = () => screen.getByTestId('form') as HTMLFormElement

describe('Checkbox', () => {
  test('keeps its id, so a <Label htmlFor> names it and a press on it toggles once', async () => {
    const user = userEvent.setup()
    render(<Terms />)
    await settle()
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    expect(checkbox.id).toBe('terms')
    expect(checkbox.getAttribute('aria-checked')).toBe('false')
    await user.click(screen.getByText('Accept terms'))
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
    expect(checkbox.hasAttribute('data-checked')).toBe(true)
    expect(screen.getByRole('checkbox').querySelector('svg')).not.toBeNull()
  })

  test('Space toggles it, and onCheckedChange gets only the new state', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Terms onCheckedChange={onCheckedChange} />)
    await settle()
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    checkbox.focus()
    await user.keyboard(' ')
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
    await user.keyboard(' ')
    expect(checkbox.getAttribute('aria-checked')).toBe('false')
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]])
  })

  test('a controlled checkbox follows its checked prop', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    const { rerender } = render(
      <Terms checked={false} onCheckedChange={onCheckedChange} />
    )
    await settle()
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    await user.click(checkbox)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(checkbox.getAttribute('aria-checked')).toBe('false')
    rerender(<Terms checked="indeterminate" />)
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed')
    rerender(<Terms checked />)
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
  })

  test('submits its name and value with FormData while checked', async () => {
    const user = userEvent.setup()
    render(<Terms name="inNavigation" defaultChecked />)
    await settle()
    expect(new FormData(form()).get('inNavigation')).toBe('on')
    await user.click(screen.getByRole('checkbox'))
    expect(new FormData(form()).has('inNavigation')).toBe(false)
    act(() => form().reset())
    await settle()
    expect(new FormData(form()).get('inNavigation')).toBe('on')
  })

  test('submits a custom value', async () => {
    render(<Terms name="terms" value="yes" defaultChecked />)
    await settle()
    expect(new FormData(form()).get('terms')).toBe('yes')
  })

  test('required blocks the form until it is checked', async () => {
    const user = userEvent.setup()
    render(<Terms name="terms" required />)
    await settle()
    expect(form().checkValidity()).toBe(false)
    await user.click(screen.getByRole('checkbox'))
    expect(form().checkValidity()).toBe(true)
  })

  test('disabled cannot change, is natively disabled, and submits nothing', async () => {
    const user = userEvent.setup()
    render(<Terms name="terms" defaultChecked disabled />)
    await settle()
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    expect(checkbox).toHaveProperty('disabled', true)
    await user.click(checkbox)
    expect(checkbox.getAttribute('aria-checked')).toBe('true')
    expect(new FormData(form()).has('terms')).toBe(false)
  })

  test('accepts what react-hook-form’s register spreads in', async () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(
      <Terms
        name="isFree"
        checked
        disabled
        ref={ref}
        onChange={() => {}}
        onBlur={() => {}}
      />
    )
    await settle()
    expect(ref.current).toBe(screen.getByRole('checkbox'))
  })
})
