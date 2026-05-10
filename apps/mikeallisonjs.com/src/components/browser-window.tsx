import type { ReactNode } from 'react'

export function BrowserWindow({
  id,
  title = 'Portfolio',
  url = 'mikeallisonjs.com/portfolio',
  contentClassName,
  children,
}: {
  id?: string
  title?: string
  url?: string
  contentClassName?: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className="mx-auto w-full max-w-[80rem] overflow-hidden rounded-[6px] border border-[#3d4248] bg-[#232629] shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
    >
      {/* Breeze title bar */}
      <div
        className="relative flex h-[30px] shrink-0 items-center px-2.5 font-mono text-[11px]"
        style={{
          background: 'linear-gradient(to bottom, #3b4045 0%, #31363b 100%)',
          borderBottom: '1px solid #2e3338',
        }}
      >
        <div className="flex gap-1.5">
          <span className="block h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#da4453]" />
          <span className="block h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#f67400]" />
          <span className="block h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#27ae60]" />
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[#7f8c8d]">
          {title}
        </span>
        <div className="w-12" />
      </div>

      {/* Navigation bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5"
        style={{ background: '#31363b', borderBottom: '1px solid #2e3338' }}
      >
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7f8c8d] opacity-40"
          aria-label="Back"
          tabIndex={-1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7f8c8d] opacity-40"
          aria-label="Forward"
          tabIndex={-1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7f8c8d] transition-colors hover:bg-white/[0.06] hover:text-[#eff0f1]"
          aria-label="Reload"
          tabIndex={-1}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#1e2226] px-3 py-[5px] font-mono text-[12px]">
          <svg className="h-3.5 w-3.5 shrink-0 text-[#3daee9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate text-[#eff0f1]">{url}</span>
        </div>

        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#7f8c8d] transition-colors hover:bg-white/[0.06] hover:text-[#eff0f1]"
          aria-label="More"
          tabIndex={-1}
        >
          <svg width="4" height="18" viewBox="0 0 4 20" fill="currentColor">
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="10" r="2" />
            <circle cx="2" cy="18" r="2" />
          </svg>
        </button>
      </div>

      {/* Page content */}
      <div className={contentClassName}>{children}</div>
    </div>
  )
}
