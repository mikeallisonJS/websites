'use client'

import * as SelectPrimitive from '@ui-sdk/react/select'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// The API matches the Radix-based shadcn Select this replaced. Radix uses ''
// for "nothing selected"; ui-sdk uses null.
const toSdkValue = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? null : value

const SelectContext = React.createContext<{
  itemContent: Map<string, React.ReactNode>
}>({ itemContent: new Map() })

// Radix shows the selected item's own content in the trigger, icons included;
// ui-sdk shows its text label. Items are found by walking the tree, as ui-sdk
// does for labels, so items rendered by a component of their own fall back to text.
function collectItemContent(
  node: React.ReactNode,
  found: Map<string, React.ReactNode>
) {
  React.Children.forEach(node, (child) => {
    if (
      !React.isValidElement<{ value?: unknown; children?: React.ReactNode }>(
        child
      )
    ) {
      return
    }
    if (child.type === SelectItem && typeof child.props.value === 'string') {
      found.set(child.props.value, child.props.children)
      return
    }
    collectItemContent(child.props.children, found)
  })
  return found
}

type SelectProps = {
  children?: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  name?: string
  form?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}

function Select({
  children,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  name,
  form,
  autoComplete,
  disabled,
  required
}: SelectProps) {
  const container = usePopupContainer()
  return (
    <SelectContext.Provider
      value={{ itemContent: collectItemContent(children, new Map()) }}
    >
      <SelectPrimitive.Select<string>
        container={container}
        value={toSdkValue(value)}
        defaultValue={toSdkValue(defaultValue)}
        onValueChange={(next) => onValueChange?.(next ?? '')}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        name={name}
        form={form}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
      >
        {children}
      </SelectPrimitive.Select>
    </SelectContext.Provider>
  )
}

function SelectGroup(props: React.ComponentProps<'div'>) {
  return <SelectPrimitive.SelectGroup {...props} />
}

function SelectValue({
  placeholder,
  children,
  ...props
}: Omit<React.ComponentProps<'span'>, 'children'> & {
  placeholder?: React.ReactNode
  children?: React.ReactNode
}) {
  const { itemContent } = React.useContext(SelectContext)
  return (
    <SelectPrimitive.SelectValue {...props}>
      {(state) =>
        state.placeholder
          ? placeholder
          : (children ?? itemContent.get(String(state.value)) ?? state.label)
      }
    </SelectPrimitive.SelectValue>
  )
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<'button'> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.SelectTrigger
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden className="size-4 opacity-50" />
    </SelectPrimitive.SelectTrigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<'div'> & {
  position?: 'popper' | 'item-aligned'
} & Pick<
    SelectPrimitive.SelectContentProps,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'collisionPadding'
  >) {
  return (
    <SelectPrimitive.SelectContent
      alignItemWithTrigger={position === 'item-aligned'}
      className={cn(
        'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--available-height) min-w-[max(8rem,var(--anchor-width))] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.SelectContent>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <SelectPrimitive.SelectGroupLabel
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  value,
  disabled,
  textValue,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSelect'> & {
  value: string
  disabled?: boolean
  textValue?: string
}) {
  return (
    <SelectPrimitive.SelectItem
      value={value}
      disabled={disabled}
      label={textValue}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.SelectItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.SelectItemIndicator>
      </span>
      <span>{children}</span>
    </SelectPrimitive.SelectItem>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <SelectPrimitive.SelectSeparator
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

/**
 * @deprecated Renders nothing. ui-sdk's list scrolls natively, and has no
 * scroll buttons.
 */
function SelectScrollUpButton(_props: React.ComponentProps<'div'>) {
  return null
}

/**
 * @deprecated Renders nothing. ui-sdk's list scrolls natively, and has no
 * scroll buttons.
 */
function SelectScrollDownButton(_props: React.ComponentProps<'div'>) {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
