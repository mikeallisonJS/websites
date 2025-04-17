import type { ReactNode } from 'react'

type GlassContainerProps = {
  children: ReactNode
}

export function GlassContainer({ children }: GlassContainerProps) {
  return (
    <div className="bg-white/60 bg-background/20 supports-[backdrop-filter]:bg-background/30 rounded p-8 backdrop-blur-sm">
      {children}
    </div>
  )
}
