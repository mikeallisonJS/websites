'use client'

import { Button } from '@mikeallisonjs/ui/components/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@mikeallisonjs/ui/components/sheet'
import { cn } from '@mikeallisonjs/ui/lib/utils'
import Image from 'next/image'
import Link, { type LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Link href="/" className="mx-auto flex items-center md:hidden">
        <Image
          className="logo"
          src="/images/cpt-border.png"
          alt="logo"
          height={64}
          width={218}
          priority
        />
      </Link>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Image
            className="logo"
            src="/images/cpt-border.png"
            alt="logo"
            height={64}
            width={218}
          />
        </MobileLink>
        <div className="flex flex-col gap-2 pt-8">
          <MobileLink href="/" onOpenChange={setOpen}>
            HOME
          </MobileLink>
          <MobileLink href="/music" onOpenChange={setOpen}>
            MUSIC
          </MobileLink>
          <MobileLink href="/links" onOpenChange={setOpen}>
            LINKS
          </MobileLink>
          <Link href="https://captainssounds.com" target="_blank">
            STORE
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
