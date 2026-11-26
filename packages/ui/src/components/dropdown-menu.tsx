'use client'

import * as MenuPrimitive from '@ui-sdk/react/menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { usePopupContainer } from '@mikeallisonjs/ui/lib/popup-container'
import { cn } from '@mikeallisonjs/ui/lib/utils'

type ItemProps = Omit<
  React.ComponentProps<'div'>,
  'onSelect' | 'defaultValue' | 'onChange'
> & {
  disabled?: boolean
  textValue?: string
}

function DropdownMenu(props: MenuPrimitive.MenuProps) {
  const container = usePopupContainer()
  return <MenuPrimitive.Menu container={container} {...props} />
}

/**
 * @deprecated Renders its children. ui-sdk menus open in the browser's top
 * layer where they are, so they need no portal.
 */
function DropdownMenuPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: Omit<
  React.ComponentProps<'button'>,
  'value' | 'defaultValue' | 'onChange'
> & {
  asChild?: boolean
}) {
  return (
    <MenuPrimitive.MenuTrigger
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

type ContentProps = React.ComponentProps<'div'> &
  Pick<
    MenuPrimitive.MenuContentProps,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'collisionPadding'
  >

function DropdownMenuContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ContentProps) {
  return (
    <MenuPrimitive.MenuContent
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--available-height) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuGroup(props: React.ComponentProps<'div'>) {
  return <MenuPrimitive.MenuGroup {...props} />
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  textValue,
  asChild,
  children,
  onClick,
  onKeyDown,
  ...props
}: ItemProps & {
  onSelect?: (event: Event) => void
  inset?: boolean
  variant?: 'default' | 'destructive'
  asChild?: boolean
}) {
  return (
    <MenuPrimitive.MenuItem
      data-inset={inset}
      data-variant={variant}
      destructive={variant === 'destructive'}
      label={textValue}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:data-[highlighted]:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        // Radix chose an item from the keyboard by clicking it, so an onClick
        // ran for Enter and Space too, the item's or its asChild child's.
        // ui-sdk calls only onSelect.
        if (
          (onClick || childHasOnClick(asChild, children)) &&
          !event.defaultPrevented &&
          !props.disabled &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function childHasOnClick(
  asChild: boolean | undefined,
  children: React.ReactNode
) {
  return (
    !!asChild &&
    React.isValidElement<{ onClick?: unknown }>(children) &&
    typeof children.props.onClick === 'function'
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  value,
  textValue,
  closeOnSelect = true,
  ...props
}: ItemProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  value?: string
  closeOnSelect?: boolean
}) {
  const id = React.useId()
  return (
    <MenuPrimitive.MenuCheckboxItem
      value={value ?? id}
      label={textValue}
      checked={checked}
      onCheckedChange={onCheckedChange}
      closeOnSelect={closeOnSelect}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.MenuItemIndicator>
          <CheckIcon className="size-4" />
        </MenuPrimitive.MenuItemIndicator>
      </span>
      {children}
    </MenuPrimitive.MenuCheckboxItem>
  )
}

function DropdownMenuRadioGroup(
  props: Omit<React.ComponentProps<'div'>, 'defaultValue' | 'onChange'> &
    MenuPrimitive.MenuRadioGroupProps
) {
  return <MenuPrimitive.MenuRadioGroup {...props} />
}

function DropdownMenuRadioItem({
  className,
  children,
  textValue,
  closeOnSelect = true,
  ...props
}: ItemProps & { value: string; closeOnSelect?: boolean }) {
  return (
    <MenuPrimitive.MenuRadioItem
      label={textValue}
      closeOnSelect={closeOnSelect}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.MenuItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenuPrimitive.MenuItemIndicator>
      </span>
      {children}
    </MenuPrimitive.MenuRadioItem>
  )
}

// A plain element, as Radix's was: ui-sdk's group label works only inside a group.
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<'div'> & {
  inset?: boolean
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <MenuPrimitive.MenuSeparator
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub(props: MenuPrimitive.MenuSubProps) {
  return <MenuPrimitive.MenuSub {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: Omit<ItemProps, 'textValue'> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.MenuSubTrigger
      data-inset={inset}
      className={cn(
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon aria-hidden className="ml-auto size-4" />
    </MenuPrimitive.MenuSubTrigger>
  )
}

function DropdownMenuSubContent({ className, ...props }: ContentProps) {
  return (
    <MenuPrimitive.MenuSubContent
      className={cn(
        'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:fade-out-0 data-open:fade-in-0 data-ending-style:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--available-height) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-lg',
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
}
