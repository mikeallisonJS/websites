// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as React from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { describe, expect, test } from 'vitest'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@mikeallisonjs/ui/components/form'
import { Input } from '@mikeallisonjs/ui/components/input'
import { Switch } from '@mikeallisonjs/ui/components/switch'
import { settle } from '@mikeallisonjs/ui/lib/test-dom'

type Values = { name: string; free: boolean }

let form: UseFormReturn<Values>

function ProductForm() {
  const methods = useForm<Values>({
    defaultValues: { name: 'Pads', free: false }
  })
  React.useEffect(() => {
    form = methods
  })
  return (
    <Form {...methods}>
      <form>
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormDescription>Shown in the store.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="free"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Free</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>No charge.</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

describe('Form', () => {
  test('FormControl gives its input the id, description and validity', async () => {
    render(<ProductForm />)
    await settle()
    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(input.tagName).toBe('INPUT')
    expect(input.className).toContain('w-full')
    expect(input.getAttribute('aria-invalid')).toBe('false')
    const description = screen.getByText('Shown in the store.')
    expect(input.getAttribute('aria-describedby')).toBe(description.id)
    expect(screen.getByText('Name').getAttribute('for')).toBe(input.id)
    expect(screen.getByText('Name').getAttribute('data-error')).toBe('false')

    act(() => form.setError('name', { message: 'Name is required' }))
    await settle()
    const message = screen.getByText('Name is required')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toBe(
      `${description.id} ${message.id}`
    )
    expect(screen.getByText('Name').getAttribute('data-error')).toBe('true')
  })

  test('FormControl keeps the input wired to react-hook-form', async () => {
    const user = userEvent.setup()
    render(<ProductForm />)
    await settle()
    const input = screen.getByRole('textbox', { name: 'Name' })
    await user.clear(input)
    await user.type(input, 'Keys')
    expect(form.getValues('name')).toBe('Keys')
  })

  test('FormControl names a ui-sdk Switch and passes it the field’s ARIA', async () => {
    const user = userEvent.setup()
    render(<ProductForm />)
    await settle()
    const control = screen.getByRole('switch', { name: 'Free' })
    expect(screen.getByText('Free').getAttribute('for')).toBe(control.id)
    expect(control.getAttribute('aria-describedby')).toBe(
      screen.getByText('No charge.').id
    )
    expect(control.getAttribute('aria-invalid')).toBe('false')

    await user.click(screen.getByText('Free'))
    expect(form.getValues('free')).toBe(true)
    expect(control.getAttribute('aria-checked')).toBe('true')
    await user.click(control)
    expect(form.getValues('free')).toBe(false)

    act(() => form.setError('free', { message: 'Pick one' }))
    await settle()
    expect(control.getAttribute('aria-invalid')).toBe('true')
  })
})
