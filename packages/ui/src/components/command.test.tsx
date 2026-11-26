// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@mikeallisonjs/ui/components/command'
import { ScrollArea } from '@mikeallisonjs/ui/components/scroll-area'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

const authors = [
  { id: 1, name: 'Arturia', count: 12 },
  { id: 2, name: 'Spitfire Audio', count: 30 },
  { id: 3, name: 'Valhalla DSP' }
]

// The same shape as freevstvault's author filter. The input has a name, or
// ui-sdk's 300ms check for unnamed controls throws when a test runs slowly.
function AuthorFilter({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <Command>
      <CommandInput aria-label="Author" placeholder="Search author..." />
      <CommandList>
        <CommandEmpty>No author found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="h-[200px]">
            <CommandItem onSelect={onSelect}>
              <span>All Authors</span>
            </CommandItem>
            {authors.map((author) => (
              <CommandItem
                key={author.id}
                value={author.name}
                onSelect={onSelect}
              >
                <span>{author.name}</span>
                {author.count && <span>({author.count})</span>}
              </CommandItem>
            ))}
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const options = () =>
  screen.queryAllByRole('option').map((option) => option.textContent)

describe('Command', () => {
  test('the input controls a listbox, and the first item starts highlighted', async () => {
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('placeholder')).toBe('Search author...')
    const listbox = screen.getByRole('listbox')
    expect(input.getAttribute('aria-controls')).toBe(listbox.id)
    expect(options()).toEqual([
      'All Authors',
      'Arturia(12)',
      'Spitfire Audio(30)',
      'Valhalla DSP'
    ])
    const first = screen.getByRole('option', { name: 'All Authors' })
    expect(first.hasAttribute('data-highlighted')).toBe(true)
    expect(input.getAttribute('aria-activedescendant')).toBe(first.id)
    expect(screen.queryByText('No author found.')).toBeNull()
  })

  test('typing filters items by value, fuzzily', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    await user.type(screen.getByRole('combobox'), 'vdsp')
    await settle()
    expect(options()).toEqual(['Valhalla DSP'])
    expect(
      screen
        .getByRole('option', { name: 'Valhalla DSP' })
        .hasAttribute('data-highlighted')
    ).toBe(true)
  })

  test("an item's value, not its other text, is what the search matches", async () => {
    const user = userEvent.setup()
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    await user.type(screen.getByRole('combobox'), '30')
    await settle()
    expect(options()).toEqual([])
  })

  test('an item without a value is searched by its text', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    await user.type(screen.getByRole('combobox'), 'all auth')
    await settle()
    expect(options()).toEqual(['All Authors'])
  })

  test('arrow keys and Enter run onSelect with the item value', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<AuthorFilter onSelect={onSelect} />)
    await settle()
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    await settle()
    const spitfire = screen.getByRole('option', { name: 'Spitfire Audio(30)' })
    expect(spitfire.hasAttribute('data-highlighted')).toBe(true)
    expect(document.activeElement).toBe(screen.getByRole('combobox'))
    await user.keyboard('{Enter}')
    await settle()
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('Spitfire Audio')
  })

  test('arrow keys stop at the last item, as cmdk did without loop', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown>5/}')
    await settle()
    expect(
      screen
        .getByRole('option', { name: 'Valhalla DSP' })
        .hasAttribute('data-highlighted')
    ).toBe(true)
  })

  test("clicking an item without a value passes its text, as cmdk's value", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<AuthorFilter onSelect={onSelect} />)
    await settle()
    await user.click(screen.getByRole('option', { name: 'All Authors' }))
    await settle()
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('All Authors')
  })

  test('CommandEmpty shows when nothing matches, outside the listbox', async () => {
    const user = userEvent.setup()
    render(<AuthorFilter onSelect={vi.fn()} />)
    await settle()
    await user.type(screen.getByRole('combobox'), 'zzz')
    await settle()
    expect(options()).toEqual([])
    const empty = screen.getByText('No author found.')
    expect(empty.hasAttribute('data-empty')).toBe(true)
    expect(screen.getByRole('listbox').contains(empty)).toBe(false)
  })

  test('a disabled item is skipped and does not run', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <Command>
        <CommandInput aria-label="Search" />
        <CommandList>
          <CommandItem value="a" onSelect={onSelect}>
            A
          </CommandItem>
          <CommandItem value="b" disabled onSelect={onSelect}>
            B
          </CommandItem>
          <CommandItem value="c" onSelect={onSelect}>
            C
          </CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown}{Enter}')
    await settle()
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('c')
    await user.click(screen.getByRole('option', { name: 'B' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  test('a group heading names its group, and label names the input', async () => {
    render(
      <Command label="Commands">
        <CommandInput />
        <CommandList>
          <CommandGroup heading="Settings">
            <CommandItem value="profile">Profile</CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    )
    await settle()
    expect(screen.getByRole('combobox', { name: 'Commands' })).toBeTruthy()
    expect(screen.getByRole('group', { name: 'Settings' })).toBeTruthy()
  })

  test('a custom filter gets the value and the search, and shouldFilter={false} keeps every item', async () => {
    const user = userEvent.setup()
    const filter = vi.fn((value: string, search: string) =>
      value.endsWith(search) ? 1 : 0
    )
    const { unmount } = render(
      <Command filter={filter}>
        <CommandInput aria-label="Search" />
        <CommandList>
          <CommandItem value="Arturia">Arturia</CommandItem>
          <CommandItem value="Valhalla">Valhalla</CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    await user.type(screen.getByRole('combobox'), 'lla')
    await settle()
    expect(options()).toEqual(['Valhalla'])
    expect(filter).toHaveBeenCalledWith('Arturia', 'lla', undefined)
    unmount()

    render(
      <Command shouldFilter={false}>
        <CommandInput aria-label="Search" />
        <CommandList>
          <CommandItem value="Arturia">Arturia</CommandItem>
          <CommandItem value="Valhalla">Valhalla</CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    await user.type(screen.getByRole('combobox'), 'zzz')
    await settle()
    expect(options()).toEqual(['Arturia', 'Valhalla'])
  })

  test("onValueChange reports the highlighted item's value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Command onValueChange={onValueChange}>
        <CommandInput aria-label="Search" />
        <CommandList>
          <CommandItem value="a">A</CommandItem>
          <CommandItem value="b">B</CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown}')
    await settle()
    expect(onValueChange).toHaveBeenLastCalledWith('b')
  })

  test('an item without a value is highlighted and chosen by its text', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Command onValueChange={onValueChange}>
        <CommandInput aria-label="Search" />
        <CommandList>
          <CommandItem>
            <span>All Authors</span>
          </CommandItem>
          <CommandItem>Arturia</CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    screen.getByRole('combobox').focus()
    await user.keyboard('{ArrowDown}')
    await settle()
    expect(onValueChange).toHaveBeenLastCalledWith('Arturia')
    await user.keyboard('{ArrowUp}')
    await settle()
    expect(onValueChange).toHaveBeenLastCalledWith('All Authors')
  })

  test('a controlled CommandInput owns the search, as in cmdk', async () => {
    const user = userEvent.setup()
    const searches: string[] = []
    function Controlled() {
      const [search, setSearch] = React.useState('val')
      return (
        <Command>
          <CommandInput
            aria-label="Search"
            value={search}
            onValueChange={(next) => {
              searches.push(next)
              setSearch(next.toLowerCase())
            }}
          />
          <CommandList>
            <CommandItem value="Arturia">Arturia</CommandItem>
            <CommandItem value="Valhalla">Valhalla</CommandItem>
          </CommandList>
        </Command>
      )
    }
    render(<Controlled />)
    await settle()
    const input = screen.getByRole<HTMLInputElement>('combobox')
    expect(input.value).toBe('val')
    expect(options()).toEqual(['Valhalla'])
    await user.clear(input)
    await user.type(input, 'ART')
    await settle()
    expect(searches.at(-1)).toBe('arT')
    expect(input.value).toBe('art')
    expect(options()).toEqual(['Arturia'])
  })

  test('an uncontrolled CommandInput still reports onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Command>
        <CommandInput aria-label="Search" onValueChange={onValueChange} />
        <CommandList>
          <CommandItem value="Arturia">Arturia</CommandItem>
          <CommandItem value="Valhalla">Valhalla</CommandItem>
        </CommandList>
      </Command>
    )
    await settle()
    await user.type(screen.getByRole('combobox'), 'va')
    await settle()
    expect(onValueChange).toHaveBeenLastCalledWith('va')
    expect(options()).toEqual(['Valhalla'])
  })
})
