'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea
} from '@mikeallisonjs/shared-react-components'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { schema } from '../../../../lib/drizzle'

export const FormSchema = z.object({
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
  price: z.coerce.string(),
  download: z
    .object({
      url: z.string().nullable()
    })
    .nullable(),
  images: z.array(
    z.object({
      url: z.string()
    })
  )
})

export function ProductForm({
  product,
  categories,
  onSubmit
}: {
  product?: typeof schema.product.$inferSelect & {
    download?: typeof schema.download.$inferSelect | null
    images?: (typeof schema.image.$inferSelect)[]
  }
  categories: Pick<typeof schema.category.$inferSelect, 'id' | 'name'>[]
  onSubmit: (data: z.infer<typeof FormSchema>) => Promise<void>
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
      price: (product?.price ?? 0) as string,
      download: product?.download,
      images: product?.images
    }
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images'
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Textarea {...field} />
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
                  <Textarea {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input type="number" min={0} step={0.01} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="download.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Download URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {fields.map((_image, index) => (
            <div
              key={`image_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              className="flex w-full items-center space-x-2"
            >
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name={`images.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex w-full">
                      <FormLabel>Image {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Button onClick={() => remove(index)}>Remove</Button>
              </div>
            </div>
          ))}
          <div>
            <Button
              onClick={() =>
                append({
                  url: ''
                })
              }
            >
              Add Image
            </Button>
          </div>
          <div>
            <Button type="submit">{product?.id ? 'Save' : 'Create'}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
