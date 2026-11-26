// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import { Separator } from '@mikeallisonjs/ui/components/separator'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('Separator', () => {
  test('is decorative and horizontal by default', async () => {
    const { container } = render(<Separator className="my-2" />)
    await settle()
    const line = container.firstElementChild!
    expect(line.getAttribute('role')).toBe('none')
    expect(line.getAttribute('data-orientation')).toBe('horizontal')
    expect(line.className).toContain('my-2')
    expect(line.className).toContain('data-[orientation=horizontal]:h-px')
    expect(screen.queryByRole('separator')).toBeNull()
  })

  test('decorative={false} announces it with its orientation', async () => {
    render(<Separator decorative={false} orientation="vertical" />)
    await settle()
    const line = screen.getByRole('separator')
    expect(line.getAttribute('aria-orientation')).toBe('vertical')
    expect(line.getAttribute('data-orientation')).toBe('vertical')
  })
})
