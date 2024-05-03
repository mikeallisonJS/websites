import Link from 'next/link'

export function DesktopNav() {
  return (
    <div className="w-full hidden md:flex">
      <Link href="#" className="flex items-center mr-auto ml-8 text-3xl">
        mikeallison<span className="text-secondary">JS</span>
      </Link>
      <nav className="flex justify-end items-center gap-4 text-sm lg:gap-6 mr-8 font-medium">
        <Link href="#portfolio" className="hover:underline underline-offset-4">
          Portfolio
        </Link>
        <Link href="#contact" className="hover:underline underline-offset-4">
          Contact
        </Link>
        <Link href="#resume" className="hover:underline underline-offset-4">
          Resume
        </Link>
      </nav>
    </div>
  )
}
