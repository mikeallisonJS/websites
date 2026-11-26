// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@mikeallisonjs/ui/components/navigation-menu'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// Stands in for next/link with `legacyBehavior`, which clones its child with
// the href and a click handler.
function LegacyLink({
  href,
  onNavigate,
  children
}: {
  href: string
  onNavigate: (href: string) => void
  children: React.ReactElement<React.ComponentProps<'a'>>
}) {
  return React.cloneElement(children, {
    href,
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      children.props.onClick?.(event)
      event.preventDefault()
      onNavigate(href)
    }
  })
}

describe('NavigationMenu', () => {
  test('a link cloned by a router gets its href and click, with the trigger style', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <LegacyLink href="/admin/products" onNavigate={onNavigate}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Products
              </NavigationMenuLink>
            </LegacyLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    await settle()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeTruthy()
    const link = screen.getByRole('link', { name: 'Products' })
    expect(link.getAttribute('href')).toBe('/admin/products')
    expect(link.className).toContain('bg-background')
    await user.click(link)
    expect(onNavigate).toHaveBeenCalledExactlyOnceWith('/admin/products')
  })

  test('asChild renders the child element as the link, and active marks the page', async () => {
    render(
      <NavigationMenu aria-label="Admin">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild active>
              <a href="#home" data-testid="home">
                Home
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    await settle()
    expect(screen.getByRole('navigation', { name: 'Admin' })).toBeTruthy()
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toBe(screen.getByTestId('home'))
    expect(link.getAttribute('href')).toBe('#home')
    expect(link.getAttribute('aria-current')).toBe('page')
    expect(link.hasAttribute('data-current')).toBe(true)
    expect(link.className).toContain('flex-col')
    expect(link.querySelector('a')).toBeNull()
  })

  test('a trigger opens its content in the viewport and Escape closes it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <NavigationMenu onValueChange={onValueChange}>
        <NavigationMenuList>
          <NavigationMenuItem value="catalog">
            <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/admin/categories">
                Categories
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    await settle()
    const trigger = screen.getByRole('button', { name: 'Catalog' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('link', { name: 'Categories' })).toBeNull()

    trigger.focus()
    await user.keyboard('{Enter}')
    await settle()
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.hasAttribute('data-open')).toBe(true)
    expect(onValueChange).toHaveBeenLastCalledWith('catalog')
    const link = screen.getByRole('link', { name: 'Categories' })
    expect(link.closest('[data-slot=navigation-menu-viewport]')).not.toBeNull()

    await user.keyboard('{Escape}')
    await settle()
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(onValueChange).toHaveBeenLastCalledWith('')
  })

  test('without a viewport the content renders on its own', async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem value="catalog">
            <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/admin/categories">
                Categories
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Catalog' }))
    await settle()
    const link = screen.getByRole('link', { name: 'Categories' })
    expect(link.closest('[data-slot=navigation-menu-viewport]')).toBeNull()
    expect(
      document.querySelector('[data-slot=navigation-menu-viewport]')
    ).toBeNull()
  })
})
