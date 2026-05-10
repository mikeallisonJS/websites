import type { ReactNode } from 'react'

export function KdeWindow({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      className="overflow-hidden rounded-[6px] border border-[#3d4248] bg-[#232629] shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
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

      {/* Window body */}
      <div className="bg-[#232629]">{children}</div>
    </div>
  )
}
