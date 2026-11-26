// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  RadioGroup,
  RadioGroupItem
} from '@mikeallisonjs/ui/components/radio-group'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Provider(props: React.ComponentProps<typeof RadioGroup>) {
  return (
    <form data-testid="form">
      <RadioGroup aria-label="Provider" className="flex" {...props}>
        <RadioGroupItem value="perplexity" id="perplexity" />
        <label htmlFor="perplexity">Perplexity AI</label>
        <RadioGroupItem value="openai" id="openai" disabled />
        <label htmlFor="openai">OpenAI</label>
        <RadioGroupItem value="gemini" id="gemini" />
        <label htmlFor="gemini">Google Gemini</label>
      </RadioGroup>
    </form>
  )
}

const form = () => screen.getByTestId('form') as HTMLFormElement
const radio = (name: string) => screen.getByRole('radio', { name })

describe('RadioGroup', () => {
  test('items keep their ids, so <label htmlFor> names and checks them', async () => {
    const user = userEvent.setup()
    render(<Provider defaultValue="perplexity" />)
    await settle()
    const group = screen.getByRole('radiogroup', { name: 'Provider' })
    expect(group.className).toContain('gap-3')
    expect(group.className).toContain('flex')
    expect(radio('Perplexity AI').id).toBe('perplexity')
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('true')
    await user.click(screen.getByText('Google Gemini'))
    expect(radio('Google Gemini').getAttribute('aria-checked')).toBe('true')
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('false')
    expect(radio('Google Gemini').querySelector('svg')).not.toBeNull()
    expect(radio('Perplexity AI').querySelector('svg')).toBeNull()
  })

  test('a controlled group calls onValueChange with only the string value', async () => {
    const user = userEvent.setup()
    function Controlled({ onChange }: { onChange: (value: string) => void }) {
      const [value, setValue] = React.useState('perplexity')
      return (
        <Provider
          value={value}
          onValueChange={(next) => {
            onChange(next)
            setValue(next)
          }}
        />
      )
    }
    const onChange = vi.fn()
    render(<Controlled onChange={onChange} />)
    await settle()
    await user.click(radio('Google Gemini'))
    expect(radio('Google Gemini').getAttribute('aria-checked')).toBe('true')
    expect(onChange.mock.calls).toEqual([['gemini']])
  })

  test('a controlled value only changes when the parent changes it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Provider value="perplexity" onValueChange={onValueChange} />
    )
    await settle()
    await user.click(radio('Google Gemini'))
    expect(onValueChange).toHaveBeenCalledWith('gemini')
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('true')
    rerender(<Provider value="" onValueChange={onValueChange} />)
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('false')
    expect(radio('Google Gemini').getAttribute('aria-checked')).toBe('false')
  })

  test('a form reset to no default reports an empty string, as Radix values do', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Provider name="provider" onValueChange={onValueChange} />)
    await settle()
    await user.click(radio('Google Gemini'))
    act(() => form().reset())
    await settle()
    expect(onValueChange.mock.calls).toEqual([['gemini'], ['']])
    expect(new FormData(form()).has('provider')).toBe(false)
  })

  test('arrow keys move to the next enabled radio and check it', async () => {
    const user = userEvent.setup()
    render(<Provider defaultValue="perplexity" />)
    await settle()
    radio('Perplexity AI').focus()
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(radio('Google Gemini'))
    expect(radio('Google Gemini').getAttribute('aria-checked')).toBe('true')
    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(radio('Perplexity AI'))
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('true')
  })

  test('submits the checked value under its name, and resets', async () => {
    const user = userEvent.setup()
    render(<Provider name="provider" defaultValue="perplexity" />)
    await settle()
    expect(new FormData(form()).getAll('provider')).toEqual(['perplexity'])
    await user.click(radio('Google Gemini'))
    expect(new FormData(form()).getAll('provider')).toEqual(['gemini'])
    act(() => form().reset())
    await settle()
    expect(new FormData(form()).getAll('provider')).toEqual(['perplexity'])
  })

  test('required blocks the form until a radio is checked', async () => {
    const user = userEvent.setup()
    render(<Provider name="provider" required />)
    await settle()
    expect(form().checkValidity()).toBe(false)
    await user.click(radio('Google Gemini'))
    expect(form().checkValidity()).toBe(true)
  })

  test('a disabled item is skipped and styled as disabled', async () => {
    render(<Provider defaultValue="perplexity" />)
    await settle()
    expect(radio('OpenAI')).toHaveProperty('disabled', true)
    expect(radio('OpenAI').hasAttribute('data-disabled')).toBe(true)
  })

  test('a disabled group cannot change and submits nothing', async () => {
    const user = userEvent.setup()
    render(<Provider name="provider" defaultValue="perplexity" disabled />)
    await settle()
    await user.click(radio('Google Gemini'))
    expect(radio('Perplexity AI').getAttribute('aria-checked')).toBe('true')
    expect(radio('Google Gemini').hasAttribute('data-disabled')).toBe(true)
    expect(radio('Google Gemini').className).toContain(
      'data-disabled:opacity-50'
    )
    expect(new FormData(form()).has('provider')).toBe(false)
  })
})
