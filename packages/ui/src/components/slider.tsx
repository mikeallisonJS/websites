'use client'

import * as SliderPrimitive from '@ui-sdk/react/slider'
import * as React from 'react'

import { cn } from '@mikeallisonjs/ui/lib/utils'

type SliderProps = Omit<
  React.ComponentProps<'div'>,
  'defaultValue' | 'dir' | 'onChange'
> &
  Pick<
    React.ComponentProps<typeof SliderPrimitive.Slider>,
    | 'min'
    | 'max'
    | 'step'
    | 'largeStep'
    | 'minStepsBetweenThumbs'
    | 'orientation'
    | 'disabled'
    | 'name'
    | 'form'
  > & {
    value?: number[]
    defaultValue?: number[]
    onValueChange?: (value: number[]) => void
    onValueCommit?: (value: number[]) => void
  }

// Radix took arrays and rendered a thumb per value, so this does too. Radix
// also kept the thumbs inside the track, where ui-sdk centres them on their
// value: the track is inset by half a thumb, and the rail and the fill reach
// past it to the ends, so a thumb at either end sits where Radix's did. The
// track is absolute, over ui-sdk's inline `relative`, so the inset doesn't
// widen the slider in a flex row; it's still the thumbs' positioned box.
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  onValueCommit,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SliderProps) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]
  // ui-sdk names a single slider by its thumb, the range input that takes
  // focus. Radix put these on the root, where they named nothing.
  const thumbName =
    values.length === 1
      ? { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }
      : {}
  const groupName =
    values.length === 1
      ? {}
      : { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }

  return (
    <SliderPrimitive.Slider
      value={value}
      defaultValue={value === undefined ? values : undefined}
      min={min}
      max={max}
      onValueChange={(next) => onValueChange?.(next as number[])}
      onValueCommit={(next) => onValueCommit?.(next as number[])}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className
      )}
      {...groupName}
      {...props}
    >
      <SliderPrimitive.SliderControl className="before:bg-muted relative flex grow items-center before:absolute before:rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:h-1.5 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:before:w-1.5">
        <SliderPrimitive.SliderTrack className="absolute! data-[orientation=horizontal]:inset-x-2 data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=vertical]:inset-y-2 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:w-1.5 data-[orientation=vertical]:-translate-x-1/2">
          <SliderPrimitive.SliderIndicator className="bg-primary before:bg-primary before:absolute data-[orientation=horizontal]:before:inset-y-0 data-[orientation=horizontal]:before:right-full data-[orientation=horizontal]:before:w-2 data-[orientation=horizontal]:before:rounded-l-full data-[orientation=vertical]:before:inset-x-0 data-[orientation=vertical]:before:top-full data-[orientation=vertical]:before:h-2 data-[orientation=vertical]:before:rounded-b-full" />
          {values.map((_, index) => (
            <SliderPrimitive.SliderThumb
              key={index}
              index={index}
              {...thumbName}
              className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 has-focus-visible:ring-4 data-disabled:pointer-events-none"
            />
          ))}
        </SliderPrimitive.SliderTrack>
      </SliderPrimitive.SliderControl>
    </SliderPrimitive.Slider>
  )
}

export { Slider }
