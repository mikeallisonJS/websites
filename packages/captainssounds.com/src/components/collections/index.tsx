import clsx from 'clsx'
import { Suspense } from 'react'

import FilterList from '../filterList'

const collections = [
  {
    handle: '',
    title: 'Home',
    description: 'Home Page',
    seo: { title: 'Home', description: 'Home Page' },
    path: '/',
    updatedAt: '2024-04-14T09:12:11.087Z'
  },
  {
    handle: 'templates',
    title: 'Templates',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:12Z',
    path: '/search/templates'
  },
  {
    handle: 'instruments',
    title: 'Instruments',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:12Z',
    path: '/search/instruments'
  },
  {
    handle: 'racks',
    title: 'Ableton Racks',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:12Z',
    path: '/search/racks'
  },
  {
    handle: 'sample-packs',
    title: 'Sample Packs',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:12Z',
    path: '/search/sample-packs'
  },
  {
    handle: 'donationware',
    title: 'Donationware',
    description:
      "These products are provided as donationware. No fixed cost, but any contributions are greatly appreciated. Can't afford to donate? Throw me a social sub or some likes (everywhere @captainofbass). Want to try before you buy? Use the code 'TRIALFIRST' at checkout.",
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:13Z',
    path: '/search/donationware'
  },
  {
    handle: 'apparel',
    title: 'Apparel',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:13Z',
    path: '/search/apparel'
  },
  // {
  //   handle: '',
  //   title: 'All',
  //   description: 'All products',
  //   seo: { title: 'All', description: 'All products' },
  //   path: '/search',
  //   updatedAt: '2024-04-14T09:12:11.087Z'
  // },
  {
    handle: 'all',
    title: 'All',
    description: '',
    seo: { description: null, title: null },
    updatedAt: '2024-04-13T09:23:12Z',
    path: '/search/all'
  }
]

async function CollectionList() {
  // const collections = await getCollections()
  // console.log(collections)
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
