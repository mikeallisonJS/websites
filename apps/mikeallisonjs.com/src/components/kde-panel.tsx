'use client'

import { useEffect, useState } from 'react'
import {
  IconBrandGithub,
  IconCode,
  IconFolder,
  IconLayoutList,
  IconMail,
  IconMaximize,
  IconTerminal2,
} from '@tabler/icons-react'

import type { Section } from './desktop-shell'

const tasks: { id: Section; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'agent',     label: 'Agent',     Icon: IconTerminal2 },
  { id: 'portfolio', label: 'Portfolio', Icon: IconFolder    },
  { id: 'services',  label: 'Services',  Icon: IconCode      },
  { id: 'contact',   label: 'Contact',   Icon: IconMail      },
]

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-xs text-[#7f8c8d]">{time}</span>
}

export function KdePanel({
  mode,
  active,
  onModeChange,
  onNavigate,
}: {
  mode: 'focused' | 'scroll'
  active: Section
  onModeChange: (m: 'focused' | 'scroll') => void
  onNavigate: (s: Section) => void
}) {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 flex h-[42px] shrink-0 items-center gap-0.5 px-2"
      style={{ background: '#1b1e20', borderBottom: '1px solid #2d3136' }}
    >
      {/* Brand */}
      <button
        onClick={() => onNavigate('agent')}
        className="flex items-center px-1 text-sm font-semibold tracking-tight"
      >
        <span style={{ color: '#8dd6ff' }}>mikeallison</span>
        <span style={{ color: '#5fed83' }}>JS</span>
      </button>

      <div className="mx-1.5 h-5 w-px bg-[#3d4248]" />

      {/* Task buttons */}
      {tasks.map(({ id, label, Icon }) => {
        const isActive = mode === 'focused' && active === id
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex h-8 items-center gap-1.5 rounded px-2.5 text-xs transition-colors ${
              isActive
                ? 'bg-white/[0.1] text-[#eff0f1]'
                : 'text-[#eff0f1] hover:bg-white/[0.06]'
            }`}
          >
            <Icon
              size={14}
              className={`shrink-0 ${isActive ? 'text-[#3daee9]' : 'text-[#3daee9]'}`}
            />
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2 pr-1">
        {/* Scroll / focused toggle */}
        <button
          onClick={() => onModeChange(mode === 'focused' ? 'scroll' : 'focused')}
          title={mode === 'focused' ? 'Switch to scroll view' : 'Switch to focused view'}
          className="flex h-7 w-7 items-center justify-center rounded text-[#7f8c8d] transition-colors hover:bg-white/[0.06] hover:text-[#eff0f1]"
        >
          {mode === 'focused' ? <IconLayoutList size={15} /> : <IconMaximize size={15} />}
        </button>

        <div className="h-5 w-px bg-[#3d4248]" />

        <a
          href="https://github.com/mikeallisonJS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3d4248] transition-colors hover:text-[#7f8c8d]"
          aria-label="GitHub"
        >
          <IconBrandGithub size={15} />
        </a>
        <span className="font-mono text-[10px] text-[#3d4248]">v2.0.0</span>
        <Clock />
      </div>
    </div>
  )
}
