import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { Pool } from '@neondatabase/serverless'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { PrismaNeon } from '@prisma/adapter-neon'
import { Category, PrismaClient } from '@prisma/client'

import Cart from '../cart'
import OpenCart from '../cart/openCart'
import { UserButton } from '../userButton/userButton'

import MobileMenu from './mobileMenu'
import Search, { SearchSkeleton } from './search'

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
const prisma = new PrismaClient({
  adapter
})

export default async function Navbar() {
  const categories = await prisma.category.findMany({
    where: {
      inNavigation: true
    },
    orderBy: {
      order: 'asc'
    }
  })
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu categories={categories} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <Image
                className="logo"
                src="/images/cpt-border.png"
                alt="logo"
                height={64}
                width={218}
              />
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <ul className=" gap-6 text-sm md:flex md:items-center">
              <li>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
              <li className="hidden md:flex">
                <Suspense fallback={<OpenCart />}>
                  <Cart />
                </Suspense>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
