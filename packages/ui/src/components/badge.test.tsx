// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import { Badge } from '@mikeallisonjs/ui/components/badge'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('Badge', () => {
  test('renders a span with its variant classes', async () => {
    render(
      <Badge variant="secondary" className="extra">
        New
      </Badge>
    )
    await settle()
    const badge = screen.getByText('New')
    expect(badge.tagName).toBe('SPAN')
    expect(badge.getAttribute('data-slot')).toBe('badge')
    expect(badge.className).toContain('bg-secondary')
    expect(badge.className).toContain('extra')
  })

  test('asChild renders only the child, with merged classes', async () => {
    const { container } = render(
      <Badge asChild variant="outline">
        <a href="https://example.com/tags/synth" className="child">
          Synth
        </a>
      </Badge>
    )
    await settle()
    const link = screen.getByRole('link', { name: 'Synth' })
    expect(container.firstElementChild).toBe(link)
    expect(link.getAttribute('href')).toBe('https://example.com/tags/synth')
    expect(link.className).toContain('text-foreground')
    expect(link.className).toContain('child')
  })
})
