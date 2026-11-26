// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { describe, expect, test } from 'vitest'

import { Label } from '@mikeallisonjs/ui/components/label'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

describe('Label', () => {
  test('renders a native label that names its input and focuses it', async () => {
    render(
      <>
        <Label htmlFor="name" className="mb-1">
          Name
        </Label>
        <input id="name" />
      </>
    )
    await settle()
    const label = screen.getByText('Name')
    expect(label.tagName).toBe('LABEL')
    expect(label.className).toContain('font-medium')
    expect(label.className).toContain('mb-1')
    const input = screen.getByRole('textbox', { name: 'Name' })
    await userEvent.setup().click(label)
    expect(document.activeElement).toBe(input)
  })
})
