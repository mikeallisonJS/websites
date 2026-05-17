'use client'

import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { KdePanel } from './kde-panel'

export type Section = 'agent' | 'portfolio' | 'contact'
const ALL: Section[] = ['agent', 'portfolio', 'contact']

const CAREER_START_YEAR = 2000
const BUILD_YEAR = 2026

export function DesktopShell({
  agent,
  portfolio,
  contact,
}: {
  agent: ReactNode
  portfolio: ReactNode
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

  const overlayNodes: Partial<Record<Section, ReactNode>> = { portfolio, contact }

  return (
    <>
      <div
        className={`breeze-wallpaper flex flex-col pt-[42px] ${
          mode === 'focused' ? 'h-dvh overflow-hidden' : 'min-h-dvh'
        }`}
      >
        {mode === 'scroll' ? (
          <div className="flex flex-1 flex-col gap-3 px-5 pt-3 pb-5 md:px-10 md:pb-3 lg:px-16">
            <div id="agent">{agent}</div>
            <div id="portfolio">{portfolio}</div>
            <div id="contact">{contact}</div>
          </div>
        ) : (
          <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-5 pt-3 md:px-10 md:pb-0 lg:px-16">
            <div
              className={`flex min-h-0 flex-1 flex-col ${active === 'agent' ? '' : 'invisible pointer-events-none'}`}
              aria-hidden={active !== 'agent'}
            >
              {agent}
            </div>
            <AnimatePresence mode="wait">
              {active !== 'agent' && (
                <motion.div
                  key={active}
                  className="absolute inset-0 flex min-h-0 flex-1 flex-col px-5 pb-5 pt-3 md:px-10 md:pb-0 lg:px-16"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  {overlayNodes[active]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <p className="mx-auto hidden max-w-3xl shrink-0 pb-4 pt-3 text-center font-medium leading-snug text-[#eff0f1] md:block md:max-w-none md:whitespace-nowrap md:text-[clamp(1.125rem,2.34vw,1.875rem)]">
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
