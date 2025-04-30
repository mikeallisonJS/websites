'use client'

import { PageContainer } from '@mikeallisonjs/shared-react-components'
import Link from 'next/link'

import Bio from '@/components/bio/bio'
import { GlassContainer } from '@/components/glassContainer'

export default function Epk() {
  return (
    <PageContainer>
      <Bio />
      <div className="p-1" />
      <GlassContainer>
        <div className="text-2xl">Testimonials</div>
        <div>
          &quot;Clever with a touch of amazing&quot;
          <br />- CM (Promoter)
        </div>
        <div>
          &quot;When passion and precision destroy the ideology of genres&quot;
          <br />- TM (Attendee)
        </div>
        <div>
          &quot;Untz untz womp womp&quot;
          <br />- HK (Indusry Insider & Promoter)
        </div>
        <div>
          &quot;This is like the first time I took MDMA&quot;
          <br />
          -&nbsp;(Attendee)
        </div>
      </GlassContainer>
      <div className="p-1" />
      <GlassContainer>
        <div className="text-2xl">Media</div>
        <div>
          <Link href="/assets/captain-media.zip">
            Media files (logo/pic) 1.76 MB
          </Link>
        </div>
        <div>
          <Link href="assets/captain-technical-rider.pdf">
            Technical / Performance Rider 358 KB
          </Link>
        </div>
      </GlassContainer>
      <div className="p-1" />
      <GlassContainer>
        <div className="text-2xl">Inquiries</div>
        Email:&nbsp;
        <Link href="mailto:booking@captainofbass.com">
          booking&#64;captainofbass.com
        </Link>
      </GlassContainer>
    </PageContainer>
  )
}
