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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col"
    >
      {/* Agent terminal — Konsole window */}
      <div className="w-full">
        <AgentTerminal />
      </div>

      {/* Desktop tagline */}
      <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
        <h1 className="max-w-3xl text-balance text-pretty text-2xl font-medium leading-snug text-[#eff0f1] sm:text-3xl md:text-4xl">
          Over{' '}
          <span className="text-[#3daee9]">{yearsExperience} years</span>{' '}
          designing cutting-edge software for global, industry-leading businesses.
        </h1>
        <a
          href="#portfolio"
          className="group flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#7f8c8d] transition-colors hover:text-[#3daee9]"
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
      </div>
    </motion.div>
  )
}
