import { DesktopNav } from './desktopNav'
import { MobileNav } from './mobileNav'

export default function Header() {
  return (
    <header className="border-border/40 bg-background/55 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-20 max-w-screen-2xl items-center py-4">
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}
