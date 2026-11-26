// @vitest-environment jsdom

import { act, fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Slider } from '@mikeallisonjs/ui/components/slider'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

// The music player's seek bar: it follows the track until a drag starts, and
// seeks once the drag ends.
function SeekBar({
  time,
  onSeek
}: {
  time: number
  onSeek: (time: number) => void
}) {
  const [value, setValue] = React.useState(time)
  const [seeking, setSeeking] = React.useState(false)
  React.useEffect(() => {
    if (!seeking) setValue(time)
  }, [time, seeking])
  return (
    <Slider
      aria-label="Seek"
      value={[value]}
      onValueChange={([next = 0]) => {
        setSeeking(true)
        setValue(next)
      }}
      onValueCommit={([next = 0]) => {
        setSeeking(false)
        onSeek(next)
      }}
      max={200}
      step={1}
    />
  )
}

const mouse = { pointerId: 1, pointerType: 'mouse', button: 0, buttons: 1 }

// Moves are read once per animation frame.
const nextFrame = () =>
  act(() => new Promise((resolve) => requestAnimationFrame(resolve)))

// jsdom has no layout: give the track a 200px box at x=100.
function layOut(track: Element) {
  track.getBoundingClientRect = () =>
    ({
      left: 100,
      right: 300,
      top: 0,
      bottom: 6,
      width: 200,
      height: 6,
      x: 100,
      y: 0
    }) as DOMRect
}

describe('Slider', () => {
  test('a single value renders one thumb named by aria-label', async () => {
    render(<SeekBar time={42} onSeek={vi.fn()} />)
    await settle()
    const thumbs = screen.getAllByRole('slider')
    expect(thumbs).toHaveLength(1)
    const thumb = screen.getByRole('slider', { name: 'Seek' })
    expect(thumb).toHaveProperty('value', '42')
    expect(thumb.getAttribute('min')).toBe('0')
    expect(thumb.getAttribute('max')).toBe('200')
    expect(
      document.querySelector('[data-slot=slider]')?.getAttribute('aria-label')
    ).toBeNull()
  })

  test('arrow keys step, commit once the key comes up, and pass arrays', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const onValueCommit = vi.fn()
    render(
      <Slider
        aria-label="Volume"
        defaultValue={[50]}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
      />
    )
    await settle()
    const thumb = screen.getByRole('slider', { name: 'Volume' })
    thumb.focus()
    await user.keyboard('{ArrowRight}')
    expect(onValueChange).toHaveBeenLastCalledWith([51])
    expect(onValueCommit).toHaveBeenLastCalledWith([51])
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(onValueChange).toHaveBeenLastCalledWith([49])
    await user.keyboard('{PageUp}')
    expect(onValueChange).toHaveBeenLastCalledWith([59])
    await user.keyboard('{End}')
    expect(onValueCommit).toHaveBeenLastCalledWith([100])
    await user.keyboard('{Home}')
    expect(onValueCommit).toHaveBeenLastCalledWith([0])
    expect(thumb).toHaveProperty('value', '0')
  })

  test('the seek bar ignores the playing track while dragged, then seeks', async () => {
    const onSeek = vi.fn()
    const { rerender } = render(<SeekBar time={10} onSeek={onSeek} />)
    await settle()
    const control = document.querySelector('[data-slot=slider-control]')!
    layOut(document.querySelector('[data-slot=slider-track]')!)
    const thumb = screen.getByRole('slider', { name: 'Seek' })
    // Press the track at a quarter, then drag to three quarters.
    await act(async () => {
      fireEvent.pointerDown(control, { ...mouse, clientX: 150, clientY: 3 })
    })
    expect(thumb).toHaveProperty('value', '50')
    await act(async () => {
      fireEvent.pointerMove(control, { ...mouse, clientX: 250, clientY: 3 })
    })
    await nextFrame()
    expect(thumb).toHaveProperty('value', '150')
    // The track keeps playing; the thumb stays under the pointer.
    rerender(<SeekBar time={11} onSeek={onSeek} />)
    await settle()
    expect(thumb).toHaveProperty('value', '150')
    expect(onSeek).not.toHaveBeenCalled()
    await act(async () => {
      fireEvent.pointerUp(control, {
        ...mouse,
        buttons: 0,
        clientX: 250,
        clientY: 3
      })
    })
    expect(onSeek).toHaveBeenCalledTimes(1)
    expect(onSeek).toHaveBeenCalledWith(150)
    rerender(<SeekBar time={151} onSeek={onSeek} />)
    await settle()
    expect(thumb).toHaveProperty('value', '151')
  })

  test('a disabled slider cannot be focused', async () => {
    render(<Slider aria-label="Volume" defaultValue={[30]} disabled />)
    await settle()
    const thumb = screen.getByRole('slider', { name: 'Volume' })
    expect(thumb).toHaveProperty('disabled', true)
    expect(
      document
        .querySelector('[data-slot=slider]')
        ?.hasAttribute('data-disabled')
    ).toBe(true)
  })

  test('a range renders a thumb per value and names the group', async () => {
    render(<Slider aria-label="Price" defaultValue={[20, 80]} />)
    await settle()
    expect(screen.getAllByRole('slider')).toHaveLength(2)
    expect(screen.getByRole('group', { name: 'Price' })).toBeTruthy()
  })
})
