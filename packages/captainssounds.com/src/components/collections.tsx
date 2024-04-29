import { Pool } from '@neondatabase/serverless'
import clsx from 'clsx'
import { Suspense } from 'react'

import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

import FilterList from './filterList'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

async function CollectionList() {
  const categories = await prisma.category.findMany({
    where: {
      inNavigation: true
    },
    orderBy: {
      order: 'asc'
    }
  })
  const collections = [
    {
      title: 'Home',
      path: '/'
    },
    ...categories.map((category) => ({
      title: category.name,
      path: `/search/${category.id}`
    })),
    {
      title: 'All',
      path: '/search'
    }
  ]
  return <FilterList list={collections} title="" />
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300'
const items = 'bg-neutral-400 dark:bg-neutral-700'

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  )
}
