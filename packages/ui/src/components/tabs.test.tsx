// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@mikeallisonjs/ui/components/tabs'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function Report(props: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs {...props}>
      <TabsList aria-label="Feedback">
        <TabsTrigger value="report">Report an Issue</TabsTrigger>
        <TabsTrigger value="suggest">Make a Suggestion</TabsTrigger>
      </TabsList>
      <TabsContent value="report">Report form</TabsContent>
      <TabsContent value="suggest">Suggestion form</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  test('defaultValue selects its tab and shows only its panel', async () => {
    render(<Report defaultValue="suggest" />)
    await settle()
    expect(screen.getByRole('tablist', { name: 'Feedback' })).toBeTruthy()
    const suggest = screen.getByRole('tab', { name: 'Make a Suggestion' })
    expect(suggest.getAttribute('aria-selected')).toBe('true')
    expect(suggest.hasAttribute('data-selected')).toBe(true)
    expect(
      screen
        .getByRole('tab', { name: 'Report an Issue' })
        .hasAttribute('data-selected')
    ).toBe(false)
    expect(
      screen.getByRole('tabpanel', { name: 'Make a Suggestion' }).textContent
    ).toBe('Suggestion form')
    expect(screen.queryByText('Report form')).toBeNull()
  })

  test('arrow keys move between tabs and select them', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Report defaultValue="report" onValueChange={onValueChange} />)
    await settle()
    screen.getByRole('tab', { name: 'Report an Issue' }).focus()
    await user.keyboard('{ArrowRight}')
    await settle()
    const suggest = screen.getByRole('tab', { name: 'Make a Suggestion' })
    expect(document.activeElement).toBe(suggest)
    expect(suggest.getAttribute('aria-selected')).toBe('true')
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('suggest')
    expect(screen.getByRole('tabpanel').textContent).toBe('Suggestion form')
  })

  test('controlled: clicks report the value, and the parent owns it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Report value="report" onValueChange={onValueChange} />
    )
    await settle()
    await user.click(screen.getByRole('tab', { name: 'Make a Suggestion' }))
    await settle()
    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('suggest')
    expect(screen.getByRole('tabpanel').textContent).toBe('Report form')
    rerender(<Report value="suggest" onValueChange={onValueChange} />)
    await settle()
    expect(screen.getByRole('tabpanel').textContent).toBe('Suggestion form')
  })

  test('manual activation waits for Enter', async () => {
    const user = userEvent.setup()
    render(<Report defaultValue="report" activationMode="manual" />)
    await settle()
    screen.getByRole('tab', { name: 'Report an Issue' }).focus()
    await user.keyboard('{ArrowRight}')
    await settle()
    expect(screen.getByRole('tabpanel').textContent).toBe('Report form')
    await user.keyboard('{Enter}')
    await settle()
    expect(screen.getByRole('tabpanel').textContent).toBe('Suggestion form')
  })

  test('forceMount keeps an unselected panel in the page, hidden', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Letters">
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b" forceMount>
          Panel B
        </TabsContent>
      </Tabs>
    )
    await settle()
    const b = screen.getByText('Panel B')
    expect(b.hidden).toBe(true)
  })

  test('asChild makes the child element the tab', async () => {
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Letters">
          <TabsTrigger value="a" asChild>
            <button type="button" data-testid="a">
              A
            </button>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    )
    await settle()
    const tab = screen.getByRole('tab', { name: 'A' })
    expect(tab).toBe(screen.getByTestId('a'))
    expect(tab.querySelector('button')).toBeNull()
  })
})
