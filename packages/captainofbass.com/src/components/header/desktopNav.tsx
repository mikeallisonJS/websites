import Image from 'next/image'
import Link from 'next/link'

export function DesktopNav() {
  return (
    <div className="w-full hidden md:flex">
      <Link href="/" className="flex items-center mr-auto ml-8">
        <Image
          className="logo"
          src="/images/cpt-border.png"
          alt="logo"
          height={64}
          width={218}
        />
      </Link>
      <nav className="flex justify-end items-center gap-4 text-sm lg:gap-6 mr-16">
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
