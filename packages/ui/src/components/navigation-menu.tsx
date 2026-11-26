import * as NavigationMenuPrimitive from '@ui-sdk/react/navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { cn } from '@mikeallisonjs/ui/lib/utils'

// The API matches the Radix-based shadcn NavigationMenu this replaced. Radix
// uses '' for "every panel closed"; ui-sdk uses null.
const toSdkValue = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? null : value

function NavigationMenu({
  className,
  children,
  viewport = true,
  value,
  defaultValue,
  onValueChange,
  delayDuration = 200,
  orientation,
  ...props
}: Omit<React.ComponentProps<'nav'>, 'defaultValue' | 'onChange'> & {
  viewport?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  delayDuration?: number
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <NavigationMenuPrimitive.NavigationMenu
      aria-label="Main"
      data-viewport={viewport}
      value={toSdkValue(value)}
      defaultValue={toSdkValue(defaultValue)}
      onValueChange={onValueChange && ((next) => onValueChange(next ?? ''))}
      delay={delayDuration}
      orientation={orientation}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.NavigationMenu>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuList
      className={cn(
        'group flex flex-1 list-none items-center justify-center gap-1',
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'> & { value?: string }) {
  return (
    <NavigationMenuPrimitive.NavigationMenuItem
      className={cn('relative', className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-open:hover:bg-accent data-open:text-accent-foreground data-open:focus:bg-accent data-open:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value'>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuTrigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.NavigationMenuTrigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuContent
      className={cn(
        'group-data-[viewport=true]/navigation-menu:absolute group-data-[viewport=true]/navigation-menu:top-0 group-data-[viewport=true]/navigation-menu:left-0 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 p-2 pr-2.5',
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-ending-style:animate-out group-data-[viewport=false]/navigation-menu:data-ending-style:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-ending-style:fade-out-0 group-data-[viewport=false]/navigation-menu:origin-(--transform-origin) group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuViewport
      sideOffset={6}
      className={cn(
        'bg-popover text-popover-foreground data-open:animate-in data-ending-style:animate-out data-ending-style:zoom-out-95 data-open:zoom-in-90 isolate z-50 h-(--viewport-height) w-(--viewport-width) origin-(--transform-origin) overflow-hidden rounded-md border shadow',
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({
  className,
  active,
  asChild,
  children,
  ...props
}: React.ComponentProps<'a'> & {
  active?: boolean
  asChild?: boolean
}) {
  return (
    <NavigationMenuPrimitive.NavigationMenuLink
      current={active}
      className={cn(
        "data-current:focus:bg-accent data-current:hover:bg-accent data-current:bg-accent/50 data-current:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <NavigationMenuPrimitive.NavigationMenuIndicator
      className={cn(
        'data-open:opacity-100 absolute top-[calc(var(--active-item-top)+var(--active-item-height))] left-(--active-item-left) z-[1] flex h-1.5 w-(--active-item-width) items-end justify-center overflow-hidden opacity-0 transition-[opacity,left,width]',
        className
      )}
      {...props}
    >
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.NavigationMenuIndicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
}
