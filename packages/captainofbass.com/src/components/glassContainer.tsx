import { ReactNode } from 'react'

type GlassContainerProps = {
  children: ReactNode
}

export function GlassContainer({ children }: GlassContainerProps) {
  return (
    <div className="bg-background/20 supports-[backdrop-filter]:bg-background/30 rounded p-8 backdrop-blur">
      {children}
    </div>
  )
}
