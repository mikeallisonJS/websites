// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// Stands in for next/link: a component that forwards props and ref to an <a>.
function FakeLink(props: React.ComponentProps<'a'>) {
  return <a data-link="" {...props} />
}

describe('Button', () => {
  test('renders a native button that keeps the browser default type', async () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button variant="outline" size="sm" className="extra">
          Save
        </Button>
      </form>
    )
    await settle()
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button.tagName).toBe('BUTTON')
    expect(button.hasAttribute('type')).toBe(false)
    expect(button.getAttribute('data-slot')).toBe('button')
    expect(button.className).toContain('border')
    expect(button.className).toContain('h-8')
    expect(button.className).toContain('extra')
    await userEvent.setup().click(button)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  test('asChild renders only the child, with merged classes, handlers and ref', async () => {
    const user = userEvent.setup()
    const calls: string[] = []
    const ref = React.createRef<HTMLElement>()
    const childRef = React.createRef<HTMLAnchorElement>()
    const { container } = render(
      <Button
        asChild
        ref={ref as React.Ref<HTMLButtonElement>}
        variant="ghost"
        onClick={(event) => {
          event.preventDefault()
          calls.push('button')
        }}
      >
        <a
          href="https://example.com/docs"
          ref={childRef}
          className="child"
          onClick={() => calls.push('child')}
        >
          Docs <span>icon</span>
        </a>
      </Button>
    )
    await settle()
    expect(container.children).toHaveLength(1)
    const link = screen.getByRole('link', { name: 'Docs icon' })
    expect(container.firstElementChild).toBe(link)
    expect(screen.queryByRole('button')).toBeNull()
    expect(link.getAttribute('href')).toBe('https://example.com/docs')
    expect(link.getAttribute('data-slot')).toBe('button')
    expect(link.className).toContain('hover:bg-accent')
    expect(link.className.split(' ').at(-1)).toBe('child')
    expect(ref.current).toBe(link)
    expect(childRef.current).toBe(link)
    await user.click(link)
    expect(calls).toEqual(['child', 'button'])
  })

  test('asChild keeps a link component’s own href and children', async () => {
    render(
      <Button asChild size="icon">
        <FakeLink href="/admin/repositories/1">
          <span className="sr-only">Edit</span>
        </FakeLink>
      </Button>
    )
    await settle()
    const link = screen.getByRole('link', { name: 'Edit' })
    expect(link.getAttribute('data-link')).toBe('')
    expect(link.getAttribute('href')).toBe('/admin/repositories/1')
    expect(link.className).toContain('size-9')
  })

  test('asChild does not nest a childless child inside itself', async () => {
    render(
      <Button asChild>
        <a href="https://example.com" aria-label="Home" />
      </Button>
    )
    await settle()
    expect(screen.getByRole('link', { name: 'Home' }).childNodes).toHaveLength(
      0
    )
  })

  test('asChild={false} renders a disabled button around the same children', async () => {
    render(
      <Button asChild={false} disabled>
        <span>Previous</span>
      </Button>
    )
    await settle()
    const button = screen.getByRole('button', { name: 'Previous' })
    expect(button).toHaveProperty('disabled', true)
    expect(button.firstElementChild?.tagName).toBe('SPAN')
  })

  test('uses no hooks, so a Server Component can render it', () => {
    // Calling it outside a render throws if it uses a hook.
    const element = Button({
      asChild: true,
      children: <a href="https://example.com">Home</a>
    })
    expect(element.type).toBe('a')
    expect(element.props.href).toBe('https://example.com')
  })
})
