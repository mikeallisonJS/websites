// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { ScrollArea, ScrollBar } from '@mikeallisonjs/ui/components/scroll-area'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('ScrollArea', () => {
  test('renders its children inside a scrollable viewport, with a vertical scrollbar', async () => {
    render(
      <ScrollArea className="h-[200px]" data-testid="root">
        <p>First author</p>
        <p>Second author</p>
      </ScrollArea>
    )
    await settle()
    const root = screen.getByTestId('root')
    expect(root.getAttribute('data-slot')).toBe('scroll-area')
    expect(root.className).toBe('relative h-[200px]')
    const viewport = root.querySelector<HTMLElement>(
      '[data-slot=scroll-area-viewport]'
    )
    expect(viewport?.style.overflow).toBe('auto')
    expect(viewport?.className).toContain('size-full')
    expect(viewport?.contains(screen.getByText('First author'))).toBe(true)
    expect(viewport?.contains(screen.getByText('Second author'))).toBe(true)
    const scrollbar = root.querySelector<HTMLElement>(
      '[data-slot=scroll-area-scrollbar]'
    )
    expect(scrollbar?.getAttribute('data-orientation')).toBe('vertical')
    expect(scrollbar?.getAttribute('aria-hidden')).toBe('true')
    expect(
      scrollbar?.querySelector('[data-slot=scroll-area-thumb]')
    ).not.toBeNull()
  })

  test('type="always" shows the scrollbar, which is hidden by default until hovered', async () => {
    const { rerender } = render(
      <ScrollArea data-testid="root">Content</ScrollArea>
    )
    await settle()
    const scrollbar = () =>
      screen
        .getByTestId('root')
        .querySelector('[data-slot=scroll-area-scrollbar]')!
    expect(scrollbar().hasAttribute('data-visible')).toBe(false)
    rerender(
      <ScrollArea data-testid="root" type="always">
        Content
      </ScrollArea>
    )
    await settle()
    expect(scrollbar().hasAttribute('data-visible')).toBe(true)
  })

  test('ScrollBar takes a horizontal orientation', async () => {
    render(
      <ScrollArea data-testid="root">
        Content
        <ScrollBar orientation="horizontal" data-testid="bar" />
      </ScrollArea>
    )
    await settle()
    const bar = screen.getByTestId('bar')
    expect(bar.getAttribute('data-orientation')).toBe('horizontal')
    expect(bar.className).toContain('h-2.5')
  })
})
