'use server'

import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@websites/shared/react/components'

import { db } from '../lib/drizzle'

export async function Orders() {
  const user = await currentUser()
  if (!user) {
    return null
  }

  const orders = await db.query.order.findMany({
    where: (order, { inArray }) =>
      inArray(
        order.email,
        user.emailAddresses.map(({ emailAddress }) => emailAddress)
      ),
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
          ({ product }) => product.id == 'ultimate-ableton-templates'
        ).length > 0
    ).length > 0

  const uatProducts = hasUatPurchase
    ? await db.query.product.findMany({
        with: { download: true }
      })
    : []
  const uatLinks = hasUatPurchase ? await db.query.link.findMany() : []

  return orders.length === 0 ? (
    <div>No orders found</div>
  ) : (
    <Table className="text-left">
      <TableCaption>Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hasUatPurchase
          ? uatProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.download != null ? (
                    <Link href={product.download.url}>Download</Link>
                  ) : (
                    'Error'
                  )}
                </TableCell>
              </TableRow>
            ))
          : orders.map((order) =>
              order.orderToProducts.map(({ product }) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.download != null ? (
                      <Link href={product.download.url}>Download</Link>
                    ) : (
                      'Error'
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
      </TableBody>
    </Table>
  )
}
