import Link from 'next/link'

const currentYear = new Date().getFullYear()
const copyrightDate = 2020 + (currentYear > 2020 ? `-${currentYear}` : '')

export default async function Footer() {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <div className="flex flex-col items-center justify-center gap-2 py-8 md:flex-row md:gap-4">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {copyrightDate} Captain's Sounds. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
