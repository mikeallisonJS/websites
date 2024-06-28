import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core'

export const blockType = pgEnum('BlockType', [
  'Youtube',
  'List',
  'Image',
  'Text'
])

export const image = pgTable(
  'Image',
  {
    id: text('id').primaryKey().notNull(),
    order: integer('order').default(0).notNull(),
    url: text('url').notNull(),
    productId: text('productId').references(() => product.id, {
      onDelete: 'set null',
      onUpdate: 'cascade'
    })
  },
  (table) => {
    return {
      productIdOrderKey: uniqueIndex('Image_productId_order_key').on(
        table.order,
        table.productId
      )
    }
  }
)

export const imageRelation = relations(image, ({ one }) => ({
  product: one(product, {
    fields: [image.productId],
    references: [product.id]
  })
}))

export const download = pgTable(
  'Download',
  {
    id: text('id').primaryKey().notNull(),
    url: text('url').notNull(),
    productId: text('productId')
      .notNull()
      .references(() => product.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade'
      })
  },
  (table) => {
    return {
      productIdKey: uniqueIndex('Download_productId_key').on(table.productId)
    }
  }
)

export const order = pgTable(
  'Order',
  {
    id: text('id').primaryKey().notNull().default(sql`gen_random_uuid()`),
    email: text('email').notNull()
  },
  (table) => {
    return {
      emailIdx: index('Order_email_idx').on(table.email)
    }
  }
)

export const orderRelations = relations(order, ({ many }) => ({
  orderToProducts: many(orderToProduct)
}))

export const orderToProduct = pgTable(
  '_OrderToProduct',
  {
    orderId: text('A')
      .notNull()
      .references(() => order.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    productId: text('B')
      .notNull()
      .references(() => product.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_OrderToProduct_AB_unique').on(
        table.orderId,
        table.productId
      ),
      bIdx: index().on(table.productId)
    }
  }
)

export const orderProductRelations = relations(orderToProduct, ({ one }) => ({
  order: one(order, {
    fields: [orderToProduct.orderId],
    references: [order.id]
  }),
  product: one(product, {
    fields: [orderToProduct.productId],
    references: [product.id]
  })
}))

export const link = pgTable('Link', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  categoryId: text('categoryId')
    .notNull()
    .references(() => category.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade'
    }),
  order: integer('order').default(0).notNull()
})

export const product = pgTable('Product', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  free: boolean('free').default(false).notNull(),
  downloadId: text('downloadId'),
  donationware: boolean('donationware').default(false).notNull(),
  stripeId: text('stripeId'),
  categoryId: text('categoryId')
    .notNull()
    .references(() => category.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade'
    }),
  order: integer('order').default(0).notNull(),
  price: numeric('price', { precision: 65, scale: 30 }).default('0').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull()
})

export const productRelations = relations(product, ({ one, many }) => ({
  orders: many(orderToProduct),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id]
  }),
  images: many(image),
  download: one(download),
  blocks: many(block)
}))

export const downloadRelation = relations(download, ({ one }) => ({
  product: one(product, {
    fields: [download.productId],
    references: [product.id]
  })
}))

export const category = pgTable(
  'Category',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    order: integer('order').notNull(),
    inNavigation: boolean('inNavigation').default(true).notNull()
  },
  (table) => {
    return {
      orderKey: uniqueIndex('Category_order_key').on(table.order)
    }
  }
)

export const categoryRelation = relations(category, ({ many }) => ({
  products: many(product)
}))

export const block = pgTable('Block', {
  id: text('id').primaryKey().notNull(),
  value: text('value').notNull(),
  type: blockType('type').notNull(),
  className: text('className').default('').notNull(),
  order: integer('order').notNull(),
  productId: text('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'restrict', onUpdate: 'cascade' })
})

export const blockRelations = relations(block, ({ one }) => ({
  product: one(product, {
    fields: [block.productId],
    references: [product.id]
  })
}))

// export const productOrderCount = pgMaterializedView('ProductOrderCount', {
//   count: integer('count').notNull(),
//   productId: text('productId').notNull()
// }).as(
//   sql`SELECT COUNT(*) AS count, "productId" FROM "_OrderToProduct" GROUP BY "productId"`
// )
