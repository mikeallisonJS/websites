import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { UserButton } from '../userButton'

import Search, { SearchSkeleton } from './search'

export default async function Navbar() {
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
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
          <div className="hidden justify-center md:flex md:w-1/3" />
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
