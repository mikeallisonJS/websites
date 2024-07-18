import { Suspense } from 'react'

import { cn } from '@mikeallisonjs/shared-react-lib'

import { db } from '../lib/drizzle'

import FilterList from './filterList'

async function CollectionList() {
  const categories = await db.query.category.findMany({
    where: (category, { eq }) => eq(category.inNavigation, true),
    orderBy: (category, { asc }) => [asc(category.order)]
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
          <div className={cn(skeleton, activeAndTitles)} />
          <div className={cn(skeleton, activeAndTitles)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
          <div className={cn(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  )
}
