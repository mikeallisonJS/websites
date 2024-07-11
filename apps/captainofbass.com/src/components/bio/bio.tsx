'use client'

import { usePathname } from 'next/navigation'

import { GlassContainer } from '../glassContainer'

export default function Bio() {
  const path = usePathname()
  return (
    <GlassContainer>
      {path === '/epk' && <div className="text-2xl">Bio</div>}
      <div className="text-left">
        Since the late 90s Mike Allison has been a staple in the Electronic
        Music scene as a DJ, producer, promoter and supporter. After 20+ years
        in the Southeast, he is now bringing his signature sounds to the West
        Coast under the name Captain. As a founder and resident of both SLTDNB
        and Ultraviolet, he has brought a new following and celebration of Drum
        and Bass to South Lake Tahoe.
      </div>
    </GlassContainer>
  )
}
