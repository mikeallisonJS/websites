'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import {
  ArrowRightEndOnRectangleIcon,
  CurrencyDollarIcon,
  UserIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@websites/shared/react/components'

const UserButtonAndMenu = () => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const router = useRouter()
  const label = user?.firstName ? user.firstName : 'Profile'
  const myProducts = () => router.push('/user/orders')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.hasImage ? (
          <Image
            alt={label ? label : 'Profile image'}
            src={user?.imageUrl}
            width={30}
            height={30}
            className="mr-2 rounded-full border border-stone-950 drop-shadow-sm"
          />
        ) : (
          <UserIcon className="mr-2 h-6 w-auto" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={myProducts}>
              <CurrencyDollarIcon className="mr-2 h-6 w-auto" />
              My Products
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openUserProfile()}
              className="cursor-pointer"
            >
              <UserIcon className="mr-2 h-6 w-auto" />
              My Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut(() => router.push('/'))}
            className="cursor-pointer"
          >
            <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-auto" /> Sign
            Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export const UserButton = () => {
  const { isLoaded, user } = useUser()
  const { openSignIn } = useClerk()

  if (!isLoaded)
    return <UserIcon className="mr-2 h-6 w-auto" onClick={() => openSignIn()} />

  if (!user?.id) return null

  return <UserButtonAndMenu />
}
