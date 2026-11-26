// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@mikeallisonjs/ui/components/tooltip'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// A tooltip within 400ms of another one opens at once, skipping its delay.
const cool = () => act(() => new Promise((r) => setTimeout(r, 450)))

function ScoreButton({
  delayDuration,
  ...props
}: React.ComponentProps<typeof Tooltip>) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip {...props}>
        <TooltipTrigger asChild>
          <Button variant="outline">Score Plugins</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scores up to 10 at a time</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

describe('Tooltip', () => {
  test('an asChild trigger renders the child alone, described by the tooltip on focus', async () => {
    const user = userEvent.setup()
    render(<ScoreButton />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Score Plugins' })
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(trigger.getAttribute('data-slot')).toBe('tooltip-trigger')
    expect(screen.queryByRole('tooltip')).toBeNull()
    await user.tab()
    await settle()
    expect(document.activeElement).toBe(trigger)
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.textContent).toBe('Scores up to 10 at a time')
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id)
    expect(
      tooltip.querySelector('[data-slot=tooltip-arrow]')?.className
    ).toContain('rotate-45')
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('tooltip')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('hover opens at once by default, and waits for a provider delay', async () => {
    const user = userEvent.setup()
    await cool()
    const { unmount } = render(<ScoreButton />)
    await settle()
    await user.hover(screen.getByRole('button'))
    await settle()
    expect(screen.getByRole('tooltip')).toBeTruthy()
    unmount()
    await cool()
    render(<ScoreButton delayDuration={60_000} />)
    await settle()
    await user.hover(screen.getByRole('button'))
    await settle()
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  test("a tooltip's own delayDuration wins over the provider's", async () => {
    const user = userEvent.setup()
    await cool()
    render(
      <TooltipProvider delayDuration={60_000}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Info</TooltipTrigger>
          <TooltipContent>More</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    await settle()
    await user.hover(screen.getByRole('button'))
    await settle()
    expect(screen.getByRole('tooltip')).toBeTruthy()
  })

  test('a controlled tooltip asks its parent, which owns open', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <ScoreButton open={false} onOpenChange={onOpenChange} />
    )
    await settle()
    await user.tab()
    await settle()
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything())
    expect(screen.queryByRole('tooltip')).toBeNull()
    rerender(<ScoreButton open onOpenChange={onOpenChange} />)
    await settle()
    expect(screen.getByRole('tooltip')).toBeTruthy()
  })
})
