// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@mikeallisonjs/ui/components/alert-dialog'
import { Button } from '@mikeallisonjs/ui/components/button'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

function DeleteTag({
  onAction,
  ...props
}: React.ComponentProps<typeof AlertDialog> & {
  onAction?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Delete tag</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe('AlertDialog', () => {
  test('opens a named alertdialog with focus on Cancel', async () => {
    const user = userEvent.setup()
    render(<DeleteTag />)
    await settle()
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByRole('button').className).toContain('bg-destructive')
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await settle()
    const dialog = screen.getByRole('alertdialog', { name: 'Are you sure?' })
    expect(
      document.querySelector('[data-slot=alert-dialog-backdrop]')?.className
    ).toContain('bg-black/50')
    expect(dialog.getAttribute('aria-describedby')).toBe(
      screen.getByText('This cannot be undone.').id
    )
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Cancel' })
    )
  })

  test('Cancel and Action close it; Escape too, returning focus', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(<DeleteTag onAction={onAction} />)
    await settle()
    const trigger = screen.getByRole('button', { name: 'Delete' })
    await user.click(trigger)
    await settle()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await settle()
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(onAction).not.toHaveBeenCalled()
    await user.click(trigger)
    await settle()
    await user.click(screen.getByRole('button', { name: 'Delete tag' }))
    await settle()
    expect(onAction).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alertdialog')).toBeNull()
    await user.click(trigger)
    await settle()
    await user.keyboard('{Escape}')
    await settle()
    expect(screen.queryByRole('alertdialog')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })

  test('an Action onClick that prevents default keeps it open', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <DeleteTag
        open
        onOpenChange={onOpenChange}
        onAction={(event) => event.preventDefault()}
      />
    )
    await settle()
    await user.click(screen.getByRole('button', { name: 'Delete tag' }))
    await settle()
    expect(onOpenChange).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await settle()
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      false,
      expect.anything()
    )
  })

  test('the buttons keep their button styles, and a disabled Cancel does nothing', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <AlertDialog open onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogTitle>Sure?</AlertDialogTitle>
          <AlertDialogCancel disabled>Cancel</AlertDialogCancel>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    )
    await settle()
    const cancel = screen.getByRole('button', { name: 'Cancel' })
    expect(cancel.className).toContain('bg-background')
    expect(cancel.className).not.toContain('bg-primary')
    expect(screen.getByRole('button', { name: 'OK' }).className).toContain(
      'bg-primary'
    )
    await user.click(cancel)
    await settle()
    expect(onOpenChange).not.toHaveBeenCalled()
  })
})
