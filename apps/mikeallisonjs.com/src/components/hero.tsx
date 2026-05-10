'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { AgentTerminal } from './agent-terminal'

export function Hero() {
  const [yearsExperience, setYearsExperience] = useState(24)

  useEffect(() => {
    setYearsExperience(new Date().getFullYear() - 2000)
  }, [])

  return (
    <div className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden">
      {/* Glow orbs */}
      <div
        aria-hidden
        className="orb-a pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(140, 147, 251, 0.45) 0%, rgba(140, 147, 251, 0) 70%)'
        }}
      />
      <div
        aria-hidden
        className="orb-b pointer-events-none absolute -right-24 top-32 h-[26rem] w-[26rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(141, 214, 255, 0.4) 0%, rgba(141, 214, 255, 0) 70%)'
        }}
      />
      <div
        aria-hidden
        className="orb-c pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(95, 237, 131, 0.25) 0%, rgba(95, 237, 131, 0) 70%)'
        }}
      />

      {/* Grid backdrop */}
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto flex flex-1 max-w-[80rem] flex-col items-center px-6 pb-16 pt-8 text-center md:pt-10"
      >
        {/* Interactive agent terminal */}
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <AgentTerminal />
        </div>

        {/* Tagline */}
        <h1 className="mt-6 max-w-3xl text-balance text-pretty text-2xl font-medium leading-snug text-[color:var(--faded-silver)] sm:text-3xl md:text-4xl">
          Over{' '}
          <span className="text-[color:var(--polar-blue)]">
            {yearsExperience} years
          </span>{' '}
          designing cutting-edge software for global, industry-leading
          businesses.
        </h1>

        {/* CTA hint */}
        <a
          href="#portfolio"
          className="group mt-auto flex flex-col items-center gap-2 pt-10 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--ui-gray)] transition-colors hover:text-[color:var(--polar-blue)]"
        >
          <span>scroll</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 9 7 7 7-7" />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}
