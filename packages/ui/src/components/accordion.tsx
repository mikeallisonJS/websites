'use client'

import * as AccordionPrimitive from '@ui-sdk/react/accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { asChildProps } from '@mikeallisonjs/ui/lib/as-child'
import { cn } from '@mikeallisonjs/ui/lib/utils'

type AccordionBaseProps = Omit<
  React.ComponentProps<'div'>,
  'defaultValue' | 'onChange'
> & {
  disabled?: boolean
}

// The API matches the Radix-based shadcn Accordion this replaced: one string
// with `type="single"`, where '' means closed, or an array with "multiple".
// ui-sdk always uses an array.
type AccordionProps =
  | (AccordionBaseProps & {
      type: 'single'
      value?: string
      defaultValue?: string
      onValueChange?: (value: string) => void
      collapsible?: boolean
    })
  | (AccordionBaseProps & {
      type: 'multiple'
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
    })

const toArray = (value: string | undefined) =>
  value === undefined ? undefined : value === '' ? [] : [value]

function Accordion(props: AccordionProps) {
  if (props.type === 'multiple') {
    const { type: _type, onValueChange, ...rest } = props
    return (
      <AccordionPrimitive.Accordion<string>
        multiple
        onValueChange={(next) => onValueChange?.(next)}
        {...rest}
      />
    )
  }
  const {
    type: _type,
    value,
    defaultValue,
    onValueChange,
    collapsible = false,
    ...rest
  } = props
  return (
    <AccordionPrimitive.Accordion<string>
      value={toArray(value)}
      defaultValue={toArray(defaultValue)}
      onValueChange={(next) => onValueChange?.(next[0] ?? '')}
      collapsible={collapsible}
      {...rest}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<'div'> & {
  value: string
  disabled?: boolean
}) {
  return (
    <AccordionPrimitive.AccordionItem
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  asChild,
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'value'> & { asChild?: boolean }) {
  const content = asChild ? (
    children
  ) : (
    <>
      {children}
      <ChevronDownIcon
        aria-hidden
        className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
      />
    </>
  )
  return (
    <AccordionPrimitive.AccordionHeader className="flex">
      <AccordionPrimitive.AccordionTrigger
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] data-disabled:pointer-events-none data-disabled:opacity-50 [&[data-open]>svg]:rotate-180',
          className
        )}
        {...props}
        {...asChildProps(asChild, content)}
      />
    </AccordionPrimitive.AccordionHeader>
  )
}

function AccordionContent({
  className,
  children,
  forceMount,
  ...props
}: React.ComponentProps<'div'> & { forceMount?: boolean }) {
  return (
    <AccordionPrimitive.AccordionPanel
      keepMounted={forceMount}
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.AccordionPanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
