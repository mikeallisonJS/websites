import { Suspense } from 'react'
import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

import { BrowserWindow } from '@/components/browser-window'
import { DesktopShell } from '@/components/desktop-shell'
import { Hero } from '@/components/hero'
import { KdeWindow } from '@/components/kde-window'
import { Portfolio } from '@/components/portfolio'
import { Services } from '@/components/services'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DesktopShell
        agent={<Hero />}
        portfolio={
          <BrowserWindow
            title="Portfolio"
            url="mikeallisonjs.com/portfolio"
            contentClassName="max-h-[70vh] overflow-y-auto"
          >
            <div className="pb-10 pt-5 md:pb-14 md:pt-7">
              <Portfolio />
            </div>
          </BrowserWindow>
        }
        services={
          <KdeWindow title="Services">
            <div className="py-10 md:py-14">
              <Services />
            </div>
          </KdeWindow>
        }
        contact={
          <KdeWindow title="Contact">
            <div className="py-10 md:py-14">
              <ContactSection />
            </div>
          </KdeWindow>
        }
      />
    </Suspense>
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

        <Link
          href="mailto:dj.mikeallison@gmail.com"
          className="group mt-4 flex w-full max-w-2xl items-center justify-between gap-4 rounded-[6px] border border-[#3d4248] bg-[#1b1e20] px-5 py-6 font-mono text-base transition-colors hover:border-[#3daee9]/50 hover:bg-[#1e2326] sm:px-7 sm:py-8 sm:text-xl"
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
