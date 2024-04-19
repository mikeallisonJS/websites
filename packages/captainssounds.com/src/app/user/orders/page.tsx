import { currentUser } from '@clerk/nextjs/server'
import {
  PageContainer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@websites/shared/react/components'
import Link from 'next/link'
import { ReactElement } from 'react'

import {
  Download,
  Link as PrismaLink,
  PrismaClient,
  Product
} from '@prisma/client'

const prisma = new PrismaClient()

export default async function Orders(): Promise<ReactElement | null> {
  const user = await currentUser()
  if (!user) {
    return null
  }

  const orders = await prisma.order.findMany({
    where: {
      email: {
        in: user.emailAddresses.map(({ emailAddress }) => emailAddress)
      }
    },
    include: {
      products: {
        include: {
          download: true
        }
      }
    }
  })

  const hasUatPurchase =
    orders.filter(
      ({ products }) =>
        products.filter(({ id }) => id == 'ultimate-ableton-templates').length >
        0
    ).length > 0
  let uatProducts: Array<Product & { download: Download | null }> = []
  let uatLinks: PrismaLink[] = []
  if (hasUatPurchase) {
    uatProducts = await prisma.product.findMany({
      include: { download: true }
    })
    uatLinks = await prisma.link.findMany({})
  }
  return orders.length === 0 ? (
    <div>No orders found</div>
  ) : (
    <PageContainer>
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
                order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
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
    </PageContainer>
  )
}
