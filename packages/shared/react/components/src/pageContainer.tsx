import { ReactNode } from 'react'

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-[90vw] mx-[5vw] mt-4 mb-20 flex flex-col justify-center text-center">
      {children}
    </div>
  )
}
