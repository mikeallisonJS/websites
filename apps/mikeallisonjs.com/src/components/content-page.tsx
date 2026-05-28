import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site-footer'
import { nav } from '@/lib/site'

/**
 * Shared chrome for the statically-rendered content pages. Provides a real
 * document structure — header nav, a single <h1>, a <main> landmark, and the
 * footer — so each page reads as a clean, self-contained document to crawlers
 * while staying on-brand with the homepage's terminal aesthetic.
 */
export function ContentPage({
  title,
  lead,
  eyebrow,
  breadcrumb,
  children
}: {
  title: string
  lead?: ReactNode
  eyebrow?: string
  /** Optional parent link rendered above the title, e.g. back to a listing. */
  breadcrumb?: { href: string; label: string }
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh bg-[color:var(--deep-space)]">
      <header className="sticky top-0 z-50 w-full border-b border-[color:var(--subtle-gray)] bg-[color:var(--deep-space)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
          <Link
            href="/"
            className="mr-auto text-lg font-semibold tracking-tight"
          >
            <span className="text-[color:var(--polar-blue)]">mikeallison</span>
            <span className="text-[color:var(--neon-green)]">JS</span>
          </Link>
          <nav
            aria-label="Primary"
            className="flex items-center gap-1 text-sm md:gap-2"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 font-mono text-xs text-[color:var(--ui-gray)] transition-colors hover:bg-white/[0.04] hover:text-[color:var(--polar-blue)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-[color:var(--ui-gray)] transition-colors hover:text-[color:var(--polar-blue)]"
          >
            <IconArrowLeft size={14} />
            {breadcrumb.label}
          </Link>
        )}

        <header className="mb-10">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[color:var(--polar-blue)]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-[color:var(--ghost-white)] md:text-5xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--ui-gray)]">
              {lead}
            </p>
          )}
        </header>

        {children}
      </main>

      <SiteFooter />
    </div>
  )
}
