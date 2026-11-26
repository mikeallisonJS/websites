// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from '@mikeallisonjs/ui/components/breadcrumb'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function FakeLink(props: React.ComponentProps<'a'>) {
  return <a data-link="" {...props} />
}

describe('Breadcrumb', () => {
  test('a link renders an anchor, and asChild renders the child in its place', async () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="extra">
              <FakeLink href="/music">Music</FakeLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Track</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    await settle()
    const home = screen.getByRole('link', { name: 'Home' })
    expect(home.tagName).toBe('A')
    expect(home.getAttribute('data-slot')).toBe('breadcrumb-link')
    const music = screen.getByRole('link', { name: 'Music' })
    expect(music.getAttribute('data-link')).toBe('')
    expect(music.getAttribute('href')).toBe('/music')
    expect(music.getAttribute('data-slot')).toBe('breadcrumb-link')
    expect(music.className).toContain('hover:text-foreground')
    expect(music.className).toContain('extra')
    expect(music.parentElement?.tagName).toBe('LI')
  })
})
