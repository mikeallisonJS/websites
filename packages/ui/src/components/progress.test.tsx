// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import { Progress } from '@mikeallisonjs/ui/components/progress'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

const indicator = () =>
  screen
    .getByRole('progressbar')
    .querySelector<HTMLElement>('[data-slot="progress-indicator"]')!

describe('Progress', () => {
  test('reads its value from 0 to 100 and fills that much of the track', async () => {
    render(<Progress aria-label="Scoring" value={40} className="h-3" />)
    await settle()
    const bar = screen.getByRole('progressbar', { name: 'Scoring' })
    expect(bar.getAttribute('aria-valuenow')).toBe('40')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-valuemax')).toBe('100')
    expect(bar.className).toContain('h-3')
    expect(bar.className).not.toContain('h-2')
    expect(indicator().style.width).toBe('40%')
  })

  test('a new value updates the bar', async () => {
    const { rerender } = render(<Progress aria-label="Scoring" value={10} />)
    await settle()
    rerender(<Progress aria-label="Scoring" value={75} />)
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe(
      '75'
    )
    expect(indicator().style.width).toBe('75%')
  })

  test('without a value it is indeterminate, with an empty fill', async () => {
    render(<Progress aria-label="Scoring" />)
    await settle()
    const bar = screen.getByRole('progressbar')
    expect(bar.hasAttribute('aria-valuenow')).toBe(false)
    expect(bar.hasAttribute('data-indeterminate')).toBe(true)
    expect(indicator().style.width).toBe('')
    expect(indicator().className).toContain('w-0')
  })

  test('max scales the fill', async () => {
    render(<Progress aria-label="Scoring" value={3} max={4} />)
    await settle()
    expect(indicator().style.width).toBe('75%')
  })
})
