// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@mikeallisonjs/ui/components/avatar'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('Avatar', () => {
  test('shows the fallback while the image has not loaded', async () => {
    const { container } = render(
      <Avatar className="h-8 w-8">
        <AvatarImage src="/ada.png" alt="Ada Lovelace" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    )
    await settle()
    const root = container.firstElementChild!
    expect(root.className).toContain('rounded-full')
    expect(root.className).toContain('h-8')
    expect(root.getAttribute('data-loading-status')).toBe('loading')
    expect(screen.getByText('AL').className).toContain('bg-muted')
    const image = container.querySelector('img')!
    expect(image.getAttribute('src')).toBe('/ada.png')
    expect(image.getAttribute('aria-hidden')).toBe('true')
  })

  test('delayMs waits before showing the fallback', async () => {
    render(
      <Avatar>
        <AvatarFallback delayMs={30}>AL</AvatarFallback>
      </Avatar>
    )
    await settle()
    expect(screen.queryByText('AL')).toBeNull()
    await screen.findByText('AL')
  })
})
