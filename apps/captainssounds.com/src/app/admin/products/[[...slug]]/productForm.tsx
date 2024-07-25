'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea
} from '@mikeallisonjs/shared-react-components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { schema } from '../../../../lib/drizzle'

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  htmlDescription: z.string(),
  free: z.boolean(),
  downloadId: z.string(),
  donationware: z.boolean(),
  stripeId: z.string(),
  testStripeId: z.string(),
  categoryId: z.string(),
  price: z.number()
})

export function ProductForm({
  product,
  categories
}: {
  product?: typeof schema.product.$inferSelect
  categories: Pick<typeof schema.category.$inferSelect, 'id' | 'name'>[]
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // ...product
      id: product?.id ?? '',
      name: product?.name ?? '',
      description: product?.description ?? '',
      htmlDescription: product?.htmlDescription ?? '',
      free: product?.free ?? false,
      downloadId: product?.downloadId ?? '',
      donationware: product?.donationware ?? false,
      stripeId: product?.stripeId ?? '',
      testStripeId: product?.testStripeId ?? '',
      categoryId: product?.categoryId ?? '',
      price: (product?.price ?? 0) as number
    }
  })
  function onSubmit(_data: z.infer<typeof FormSchema>) {
    console.log(_data)
  }
  return (
    <div>
      {product !== undefined ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="htmlDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HTML Description</FormLabel>
                  <FormControl>
                    <Textarea value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="donationware"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donationware</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="downloadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Download ID</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stripeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stripe ID</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testStripeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Stripe ID</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      ) : null}
    </div>
  )
}
