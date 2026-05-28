import { IconBrandGithub, IconMail } from '@tabler/icons-react'
import Link from 'next/link'

import { buildYear, nav, site } from '@/lib/site'

/**
 * Server-rendered footer. Beyond being useful to humans, it guarantees a set
 * of crawlable internal links to every indexable page exists in the initial
 * HTML — the homepage's interactive desktop shell otherwise exposes none.
 */
export async function SiteFooter() {
  const year = await buildYear()
  return (
    <footer className="border-t border-[color:var(--subtle-gray)] bg-[color:var(--deep-space)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-[color:var(--polar-blue)]">mikeallison</span>
            <span className="text-[color:var(--neon-green)]">JS</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ui-gray)]">
            {site.author} — {site.jobTitle}. {site.tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-col gap-2 text-sm font-mono"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[color:var(--ui-gray)] transition-colors hover:text-[color:var(--polar-blue)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm font-mono">
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[color:var(--ui-gray)] transition-colors hover:text-[color:var(--polar-blue)]"
          >
            <IconBrandGithub size={16} /> GitHub
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-[color:var(--ui-gray)] transition-colors hover:text-[color:var(--polar-blue)]"
          >
            <IconMail size={16} /> Email
          </Link>
        </div>
      </div>

      <div className="border-t border-[color:var(--subtle-gray)]">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs text-[color:var(--muted-text)]">
          © {year} {site.author}. Built with Next.js.
        </p>
      </div>
    </footer>
  )
}
