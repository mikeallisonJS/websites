import type { ReactNode } from 'react'

import { cn } from '@mikeallisonjs/shared-react-lib'

export default function PageContainer({
  children,
  className = ''
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-[5vw] mb-20 mt-4 flex w-[90vw] flex-col justify-center text-center',
        className
      )}
    >
      {children}
    </div>
  )
}
