import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-border/40 bg-background/55 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-12 max-w-screen-2xl items-center py-4">
        <div className="flex w-full">
          <Link href="/" className="ml-8 mr-auto flex items-center text-3xl">
            mikeallison<span className="text-secondary">JS</span>
          </Link>
          <nav className="mr-8 hidden items-center justify-end gap-4 text-sm font-medium md:flex lg:gap-6">
            <Link
              href="#portfolio"
              className="underline-offset-4 hover:underline"
            >
              Portfolio
            </Link>
            <Link
              href="#services"
              className="underline-offset-4 hover:underline"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="underline-offset-4 hover:underline"
            >
              Contact
            </Link>
            <Link href="https://github.com/mikeallisonJS" target="_blank">
              <IconBrandGithub />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
