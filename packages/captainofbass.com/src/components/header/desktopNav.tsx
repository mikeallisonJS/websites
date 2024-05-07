import Image from 'next/image'
import Link from 'next/link'

export function DesktopNav() {
  return (
    <div className="hidden w-full md:flex">
      <Link href="/" className="ml-8 mr-auto flex items-center">
        <Image
          className="logo"
          src="/images/cpt-border.png"
          alt="logo"
          height={64}
          width={218}
          priority
        />
      </Link>
      <nav className="mr-16 flex items-center justify-end gap-4 text-sm lg:gap-6">
        <Link href="/">HOME</Link>
        <Link href="/music">MUSIC</Link>
        <Link href="/links">LINKS</Link>
        <Link href="https://captainssounds.com" target="_blank">
          STORE
        </Link>
      </nav>
    </div>
  )
}
