import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--subtle-gray)] bg-[color:var(--deep-space)]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[color:var(--deep-space)]/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
        <Link
          href="/"
          className="mr-auto flex items-center text-xl font-semibold tracking-tight"
        >
          <span className="text-[color:var(--polar-blue)]">mikeallison</span>
          <span className="text-[color:var(--neon-green)]">JS</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          <NavLink href="#portfolio">portfolio</NavLink>
          <NavLink href="#contact">contact</NavLink>
          <Link
            href="https://github.com/mikeallisonJS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--ui-gray)] transition-colors hover:bg-white/[0.04] hover:text-[color:var(--polar-blue)]"
          >
            <IconBrandGithub size={18} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="hidden rounded-md px-3 py-1.5 font-mono text-xs text-[color:var(--ui-gray)] transition-colors hover:bg-white/[0.04] hover:text-[color:var(--polar-blue)] md:inline-block"
    >
      {children}
    </Link>
  )
}
