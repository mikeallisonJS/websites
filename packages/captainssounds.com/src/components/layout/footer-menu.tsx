'use client'

import clsx from 'clsx'
import { Menu } from '../../lib/shopify/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'

const FooterMenuItem = ({ item }: { item: Menu }): ReactElement => {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname === item.path)

  useEffect(() => {
    setActive(pathname === item.path)
  }, [pathname, item.path])

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  )
}

export default function FooterMenu({
  menu
}: {
  menu: Menu[]
}): ReactElement | null {
  if (!menu.length) return null

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />
        })}
      </ul>
    </nav>
  )
}
