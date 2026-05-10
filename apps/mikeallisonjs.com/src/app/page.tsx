import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

import { Hero } from '@/components/hero'
import { KdePanel } from '@/components/kde-panel'
import { KdeWindow } from '@/components/kde-window'
import { Portfolio } from '@/components/portfolio'
import { Services } from '@/components/services'

export default function Page() {
  return (
    <>
      <div className="breeze-wallpaper flex min-h-dvh flex-col pt-[42px]">
        <div className="flex flex-1 flex-col gap-3 p-3">
          {/* Konsole — agent terminal fills first screen */}
          <section
            id="agent"
            className="flex min-h-0 flex-col"
            style={{ minHeight: 'calc(100dvh - 42px - 1.5rem)' }}
          >
            <Hero />
          </section>

          {/* Dolphin — Portfolio */}
          <KdeWindow id="portfolio" title="Portfolio">
            <div className="py-10 md:py-14">
              <Portfolio />
            </div>
          </KdeWindow>

          {/* Kate — Services */}
          <KdeWindow id="services" title="Services">
            <div className="py-10 md:py-14">
              <Services />
            </div>
          </KdeWindow>

          {/* KMail — Contact */}
          <KdeWindow id="contact" title="Contact">
            <div className="py-10 md:py-14">
              <ContactSection />
            </div>
          </KdeWindow>
        </div>
      </div>

      <KdePanel />
    </>
  )
}

function ContactSection() {
  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6">
      <div className="flex flex-col items-start gap-6">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-[#eff0f1] sm:text-5xl md:text-6xl">
          Have a project in mind?
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-[#7f8c8d] md:text-lg">
          Shoot me an email — I respond to every serious inquiry.
        </p>

        <div className="mt-4 w-full max-w-2xl overflow-hidden rounded-[6px] border border-[#3d4248] shadow-lg">
          <div
            className="flex items-center gap-2 px-3 py-2 font-mono text-xs"
            style={{
              background: 'linear-gradient(to bottom, #3b4045 0%, #31363b 100%)',
              borderBottom: '1px solid #2e3338',
            }}
          >
            <div className="flex gap-1.5">
              <span className="block h-3 w-3 rounded-full bg-[#3d4248]" />
              <span className="block h-3 w-3 rounded-full bg-[#3d4248]" />
              <span className="block h-3 w-3 rounded-full bg-[#3d4248]" />
            </div>
            <span className="ml-2 text-[#7f8c8d]">~/contact</span>
          </div>
          <Link
            href="mailto:dj.mikeallison@gmail.com"
            className="group flex items-center justify-between gap-4 bg-[#1b1e20] px-5 py-6 font-mono text-base transition-colors hover:bg-[#1e2326] sm:px-7 sm:py-8 sm:text-xl"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-[color:var(--neon-green)]">$</span>
              <span className="text-[#7f8c8d]">mailto</span>
              <span className="truncate text-[#3daee9] underline-offset-4 group-hover:underline">
                dj.mikeallison@gmail.com
              </span>
            </span>
            <IconArrowRight
              size={20}
              className="shrink-0 text-[#3daee9] transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <Link
            href="https://github.com/mikeallisonJS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#3d4248] bg-white/[0.03] px-4 py-2 font-mono text-xs text-[#3daee9] transition-colors hover:border-[#3daee9]/50"
          >
            <IconBrandGithub size={16} />
            github
          </Link>
        </div>
      </div>
    </div>
  )
}
