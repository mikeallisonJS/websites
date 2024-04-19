import { PrismaClient } from '@prisma/client'

import json from './backup.json' with { type: 'json' }

const prisma = new PrismaClient()

async function main() {
  const collections = json.__collections__

  const products = collections.products
  for (const productKey of Object.keys(products)) {
    const product = products[productKey]
    switch (product.category) {
      case 'sample-packs':
        product.category = 'sample'
        break
      case 'samples':
        product.category = 'sample'
        break
      case 'effect racks':
        product.category = 'effect'
        break
      case 'instruments':
        product.category = 'instrument'
        break
      case 'templates':
        product.category = 'template'
        break
    }

    const data = {
      name: product.name,
      category: product.category,
      description: product.description,
      free: product.free
    }

    await prisma.product.upsert({
      where: { id: productKey },
      update: data,
      create: {
        ...data,
        id: productKey
      }
    })

    if (product.images) {
      for (let index = 0; index < product.images.length; index++) {
        const id = `${productKey}-${index}`
        const image = product.images[index]
        const data = {
          order: index,
          url: image.url
        }
        await prisma.image.upsert({
          where: { id },
          update: data,
          create: {
            ...data,
            id,
            productId: productKey
          }
        })
      }
    }
  }

  const downloads = collections.downloads
  for (const downloadKey of Object.keys(downloads)) {
    const download = downloads[downloadKey]

    const data = {
      url: download.links[0]
    }

    if (products[downloadKey] != null)
      await prisma.download.upsert({
        where: { id: downloadKey },
        update: data,
        create: {
          ...data,
          id: downloadKey,
          productId: downloadKey
        }
      })
  }

  const links = collections.links
  for (const linkKey of Object.keys(links)) {
    const link = links[linkKey]

    const data = {
      name: link.name,
      description: link.description,
      category: 'bonus',
      url: link.links[0]
    }

    await prisma.link.upsert({
      where: { id: linkKey },
      update: data,
      create: {
        ...data,
        id: linkKey
      }
    })
  }

  const orders = collections.orders
  for (const orderKey of Object.keys(orders)) {
    const order = orders[orderKey]

    const data = {
      email: orderKey
    }
    const productIds = order.products
      .filter((id) => products[id] != null)
      .map((id) => ({ id }))

    await prisma.order.upsert({
      where: { id: orderKey },
      update: data,
      create: {
        ...data,
        id: orderKey,
        products: { connect: productIds }
      }
    })
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

export default main
