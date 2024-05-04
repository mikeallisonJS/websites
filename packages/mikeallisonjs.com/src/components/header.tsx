import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/55 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 max-w-screen-2xl items-center py-4">
        <div className="w-full flex">
          <Link href="#" className="flex items-center mr-auto ml-8 text-3xl">
            mikeallison<span className="text-secondary">JS</span>
          </Link>
          <nav className="hidden md:flex justify-end items-center gap-4 text-sm lg:gap-6 mr-8 font-medium">
            <Link
              href="#portfolio"
              className="hover:underline underline-offset-4"
            >
              Portfolio
            </Link>
            <Link
              href="#services"
              className="hover:underline underline-offset-4"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
