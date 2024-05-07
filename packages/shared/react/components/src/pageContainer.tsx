import { ReactNode } from 'react'

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-[5vw] mb-20 mt-4 flex w-[90vw] flex-col justify-center text-center">
      {children}
    </div>
  )
}
