// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@mikeallisonjs/ui/components/accordion'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Faq(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="what">
        <AccordionTrigger>What is it?</AccordionTrigger>
        <AccordionContent>A directory.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="free">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>Yes.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const trigger = (name: string) => screen.getByRole('button', { name })

describe('Accordion', () => {
  test('single + collapsible opens one item at a time and closes it again', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Faq type="single" collapsible onValueChange={onValueChange} />)
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByText('A directory.')).toBeNull()
    expect(trigger('What is it?').parentElement?.tagName).toBe('H3')

    await user.click(trigger('What is it?'))
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('true')
    expect(trigger('What is it?').hasAttribute('data-open')).toBe(true)
    expect(screen.getByText('A directory.')).toBeTruthy()
    expect(onValueChange).toHaveBeenLastCalledWith('what')

    await user.click(trigger('Is it free?'))
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('false')
    expect(trigger('Is it free?').getAttribute('aria-expanded')).toBe('true')
    expect(onValueChange).toHaveBeenLastCalledWith('free')

    await user.click(trigger('Is it free?'))
    await settle()
    expect(trigger('Is it free?').getAttribute('aria-expanded')).toBe('false')
    expect(onValueChange).toHaveBeenLastCalledWith('')
  })

  test('single without collapsible keeps the open item open, like Radix', async () => {
    const user = userEvent.setup()
    render(<Faq type="single" defaultValue="what" />)
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('true')
    expect(trigger('What is it?').getAttribute('aria-disabled')).toBe('true')
    expect(trigger('What is it?').hasAttribute('data-disabled')).toBe(false)
    await user.click(trigger('What is it?'))
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('true')
  })

  test('the keyboard toggles a focused trigger', async () => {
    const user = userEvent.setup()
    render(<Faq type="single" collapsible />)
    await settle()
    trigger('Is it free?').focus()
    await user.keyboard('{Enter}')
    await settle()
    expect(trigger('Is it free?').getAttribute('aria-expanded')).toBe('true')
    await user.keyboard(' ')
    await settle()
    expect(trigger('Is it free?').getAttribute('aria-expanded')).toBe('false')
  })

  test('multiple keeps several items open and reports arrays', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Faq
        type="multiple"
        defaultValue={['what']}
        onValueChange={onValueChange}
      />
    )
    await settle()
    await user.click(trigger('Is it free?'))
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('true')
    expect(trigger('Is it free?').getAttribute('aria-expanded')).toBe('true')
    expect(onValueChange).toHaveBeenLastCalledWith(['what', 'free'])
  })

  test("a controlled single value of '' keeps every item closed", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Faq type="single" collapsible value="" onValueChange={onValueChange} />
    )
    await settle()
    await user.click(trigger('What is it?'))
    await settle()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('what')
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('false')
    rerender(
      <Faq
        type="single"
        collapsible
        value="what"
        onValueChange={onValueChange}
      />
    )
    await settle()
    expect(trigger('What is it?').getAttribute('aria-expanded')).toBe('true')
  })

  test('the panel is labelled by its trigger', async () => {
    render(<Faq type="single" defaultValue="free" />)
    await settle()
    expect(
      screen.getByRole('region', { name: 'Is it free?' }).textContent
    ).toBe('Yes.')
  })

  test('forceMount keeps a closed panel in the page, hidden', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="what">
          <AccordionTrigger>What is it?</AccordionTrigger>
          <AccordionContent forceMount>A directory.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    await settle()
    const panel = screen.getByText('A directory.').parentElement!
    expect(panel.getAttribute('data-slot')).toBe('accordion-panel')
    expect(panel.hidden).toBe(true)
  })

  test('asChild makes the child element the trigger, without the chevron', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="what">
          <AccordionTrigger asChild>
            <button type="button" data-testid="what">
              What is it?
            </button>
          </AccordionTrigger>
          <AccordionContent>A directory.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    await settle()
    const button = trigger('What is it?')
    expect(button).toBe(screen.getByTestId('what'))
    expect(button.querySelector('svg')).toBeNull()
    await user.click(button)
    await settle()
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })
})
