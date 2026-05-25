import { ImageResponse } from 'next/og'

import { site } from '@/lib/site'

export const alt = `${site.author} — ${site.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Site-wide social share card, generated at build time. Applies to every route
 * that doesn't define its own image, so links to the site unfurl with a
 * branded preview in chats, search, and social.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse 80% 60% at 20% 90%, rgba(61,174,233,0.18) 0%, transparent 100%), #0d1117',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700 }}>
          <span style={{ color: '#8dd6ff' }}>mikeallison</span>
          <span style={{ color: '#5fed83' }}>JS</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {site.author}
          </div>
          <div style={{ marginTop: 16, fontSize: 40, fontWeight: 600, color: '#8dd6ff' }}>
            {site.jobTitle}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#9198a1', maxWidth: 900 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  )
}
