'use client'

import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { KdePanel } from './kde-panel'

export type Section = 'agent' | 'portfolio' | 'services' | 'contact'
const ALL: Section[] = ['agent', 'portfolio', 'services', 'contact']

const CAREER_START_YEAR = 2000
const BUILD_YEAR = 2026

export function DesktopShell({
  agent,
  portfolio,
  services,
  contact,
}: {
  agent: ReactNode
  portfolio: ReactNode
  services: ReactNode
  contact: ReactNode
}) {
  const [mode, setMode] = useState<'focused' | 'scroll'>('focused')
  const [active, setActive] = useState<Section>('agent')
  const [yearsExperience, setYearsExperience] = useState(BUILD_YEAR - CAREER_START_YEAR)
  useEffect(() => {
    setYearsExperience(new Date().getFullYear() - CAREER_START_YEAR)
  }, [])

  // Restore from hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1) as Section
    if (ALL.includes(hash)) setActive(hash)
  }, [])

  // Keep URL in sync in focused mode
  useEffect(() => {
    if (mode === 'focused')
      history.replaceState(null, '', active === 'agent' ? '/' : `#${active}`)
  }, [mode, active])

  const navigate = useCallback(
    (s: Section) => {
      if (mode === 'scroll') {
        document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        setActive(s)
      }
    },
    [mode]
  )

  const nodes: Record<Section, ReactNode> = { agent, portfolio, services, contact }

  return (
    <>
      <div
        className={`breeze-wallpaper flex flex-col pt-[42px] ${
          mode === 'focused' ? 'h-dvh overflow-hidden' : 'min-h-dvh'
        }`}
      >
        {mode === 'scroll' ? (
          <div className="flex flex-1 flex-col gap-3 p-3">
            <div id="agent">{agent}</div>
            <div id="portfolio">{portfolio}</div>
            <div id="services">{services}</div>
            <div id="contact">{contact}</div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col p-3 pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
              >
                {nodes[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <p className="mx-auto max-w-3xl shrink-0 pb-4 pt-3 text-center text-2xl font-medium leading-snug text-[#eff0f1] sm:text-3xl md:text-4xl">
          Over{' '}
          <span className="text-[#3daee9]">{yearsExperience} years</span>{' '}
          designing cutting-edge software for global, industry-leading businesses.
        </p>
      </div>

      <KdePanel
        mode={mode}
        active={active}
        onModeChange={setMode}
        onNavigate={navigate}
      />
    </>
  )
}
