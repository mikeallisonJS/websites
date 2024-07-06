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
import { getOrdersForEmailOrUser } from '../getOrders'

export async function Orders() {
  const user = await currentUser()
  if (!user) {
    return null
  }

  const { orders, products } = await getOrdersForEmailOrUser({ user })

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
        {products.map((product) => (
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
        ))}
      </TableBody>
    </Table>
  )
}
