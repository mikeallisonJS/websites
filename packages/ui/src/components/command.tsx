'use client'

import * as CommandPrimitive from '@ui-sdk/react/command'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@mikeallisonjs/ui/components/dialog'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// The API matches the cmdk-based shadcn Command this replaced. cmdk uses ''
// for "nothing highlighted"; ui-sdk uses null.
const toSdkValue = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? null : value

const LabelContext = React.createContext<string | undefined>(undefined)

function Command({
  className,
  label,
  value,
  defaultValue,
  onValueChange,
  shouldFilter,
  filter,
  loop = false,
  ...props
}: Omit<
  React.ComponentProps<'div'>,
  'defaultValue' | 'onChange' | 'onSelect'
> & {
  label?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  shouldFilter?: boolean
  filter?: (value: string, search: string, keywords?: string[]) => number
  loop?: boolean
}) {
  return (
    <LabelContext.Provider value={label}>
      <CommandPrimitive.Command
        value={toSdkValue(value)}
        defaultValue={toSdkValue(defaultValue)}
        onValueChange={(next) => onValueChange?.(next ?? '')}
        filter={
          shouldFilter === false
            ? false
            : filter &&
              ((item, query) =>
                filter(item.label ?? item.value, query, item.keywords))
        }
        loop={loop}
        className={cn(
          'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
          className
        )}
        {...props}
      />
    </LabelContext.Provider>
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
}) {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command className="**:data-[slot=command-group-label]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 **:data-[slot=command-group-label]:px-2 **:data-[slot=command-group-label]:font-medium **:data-[slot=command-group]:px-2 [&_[data-slot=command-group]:not([hidden])_~[data-slot=command-group]]:pt-0 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5 **:data-[slot=command-input]:h-12 **:data-[slot=command-item]:px-2 **:data-[slot=command-item]:py-3 [&_[data-slot=command-item]_svg]:h-5 [&_[data-slot=command-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: Omit<React.ComponentProps<'input'>, 'value' | 'defaultValue'>) {
  const label = React.useContext(LabelContext)
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon aria-hidden className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.CommandInput
        aria-label={label}
        className={cn(
          'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
}

// cmdk let CommandEmpty sit inside the list. ui-sdk's list is a listbox, which
// may only hold options and groups, so a direct CommandEmpty moves out before it.
function CommandList({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const empty: React.ReactNode[] = []
  const items: React.ReactNode[] = []
  React.Children.forEach(children, (child) => {
    ;(React.isValidElement(child) && child.type === CommandEmpty
      ? empty
      : items
    ).push(child)
  })
  return (
    <>
      {empty}
      <CommandPrimitive.CommandList
        className={cn(
          'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto',
          className
        )}
        {...props}
      >
        {items}
      </CommandPrimitive.CommandList>
    </>
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <CommandPrimitive.CommandEmpty
      className={cn('text-center text-sm data-empty:py-6', className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: React.ComponentProps<'div'> & { heading?: React.ReactNode }) {
  return (
    <CommandPrimitive.CommandGroup
      className={cn('text-foreground overflow-hidden p-1', className)}
      {...props}
    >
      {heading != null && (
        <CommandPrimitive.CommandGroupLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
          {heading}
        </CommandPrimitive.CommandGroupLabel>
      )}
      {children}
    </CommandPrimitive.CommandGroup>
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <CommandPrimitive.CommandSeparator
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  value,
  keywords,
  disabled,
  onSelect,
  ref,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSelect'> & {
  value?: string
  keywords?: string[]
  disabled?: boolean
  onSelect?: (value: string) => void
}) {
  const node = React.useRef<HTMLDivElement | null>(null)
  const setRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      node.current = element
      if (typeof ref === 'function') ref(element)
      else if (ref) ref.current = element
    },
    [ref]
  )
  // cmdk searched an item's value, or its text without one, and passed the
  // same string to onSelect.
  const text = value?.trim()
  return (
    <CommandPrimitive.CommandItem
      ref={setRef}
      value={text}
      label={text}
      keywords={keywords}
      disabled={disabled}
      onSelect={
        onSelect &&
        (() => onSelect(text ?? node.current?.textContent?.trim() ?? ''))
      }
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
}
