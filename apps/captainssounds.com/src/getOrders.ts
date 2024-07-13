import type { User } from '@clerk/nextjs/dist/types/server'
import { db } from './lib/drizzle'

type getOrdersProps =
  | {
      email: string
      user?: undefined
    }
  | {
      user: User
      email?: undefined
    }

export async function getOrdersForEmailOrUser({ email, user }: getOrdersProps) {
  const orders = await db.query.order.findMany({
    where: (order, { inArray, eq }) =>
      user !== undefined
        ? inArray(
            order.email,
            user.emailAddresses.map(({ emailAddress }) => emailAddress)
          )
        : eq(order.email, email),
    with: {
      orderToProducts: {
        with: {
          product: {
            with: {
              download: true
            }
          }
        }
      }
    }
  })

  const hasUatPurchase =
    orders.filter(
      ({ orderToProducts }) =>
        orderToProducts.filter(
          ({ product }) => product.id === 'ultimate-ableton-templates'
        ).length > 0
    ).length > 0

  const uatProducts = hasUatPurchase
    ? await db.query.product.findMany({
        with: { download: true }
      })
    : orders.flatMap(({ orderToProducts }) =>
        orderToProducts.map(({ product }) => product)
      )
  const uatLinks = hasUatPurchase ? await db.query.link.findMany() : []

  return {
    orders,
    products: uatProducts,
    links: uatLinks
  }
}
