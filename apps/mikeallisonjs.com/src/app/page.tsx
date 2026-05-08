import { IconBrandGithub, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { Hero } from '@/components/hero'
import { Portfolio } from '@/components/portfolio'
import { Services } from '@/components/services'

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[color:var(--deep-space)]">
      <Hero />

      <section
        id="portfolio"
        className="relative w-full py-24 md:py-32 lg:py-40"
      >
        <Portfolio />
      </section>

      <section
        id="services"
        className="relative w-full border-y border-[color:var(--subtle-gray)] bg-[color:var(--code-canvas)]/40 py-24 md:py-32"
      >
        <Services />
      </section>

      <section
        id="contact"
        className="relative w-full py-24 md:py-32 lg:py-40"
      >
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[color:var(--ui-gray)]">
              <span className="text-[color:var(--neon-green)]">$</span>
              <span>echo $CONTACT</span>
            </div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-[color:var(--ghost-white)] sm:text-5xl md:text-6xl">
              Have a project in mind?
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[color:var(--ui-gray)] md:text-lg">
              Shoot me an email — I respond to every serious inquiry.
            </p>

            {/* Terminal-style email card */}
            <div className="mt-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-[color:var(--subtle-gray)] bg-black/40 shadow-[0_0_60px_-20px_rgba(140,147,251,0.4)] backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-[color:var(--subtle-gray)] bg-black/40 px-4 py-2.5 font-mono text-xs">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
                </div>
                <span className="ml-2 text-[color:var(--ui-gray)]">
                  ~/contact
                </span>
              </div>
              <Link
                href="mailto:dj.mikeallison@gmail.com"
                className="group flex items-center justify-between gap-4 px-5 py-6 font-mono text-base transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-8 sm:text-xl"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-[color:var(--neon-green)]">$</span>
                  <span className="text-[color:var(--ui-gray)]">mailto</span>
                  <span className="truncate text-[color:var(--polar-blue)] underline-offset-4 group-hover:underline">
                    dj.mikeallison@gmail.com
                  </span>
                </span>
                <IconArrowRight
                  size={20}
                  className="shrink-0 text-[color:var(--cosmic-violet)] transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Secondary links */}
            <div className="mt-2 flex items-center gap-3">
              <Link
                href="https://github.com/mikeallisonJS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--subtle-gray)] bg-white/[0.03] px-4 py-2 font-mono text-xs text-[color:var(--polar-blue)] transition-colors hover:border-[color:var(--polar-blue)]/60"
              >
                <IconBrandGithub size={16} />
                github
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-[color:var(--subtle-gray)] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
          <p className="font-mono text-xs text-[color:var(--muted-text)]">
            © 2026 Mike Allison — built with Next.js
          </p>
          <p className="font-mono text-xs text-[color:var(--muted-text)]">
            v2.0.0
          </p>
        </div>
      </footer>
    </div>
  )
}
