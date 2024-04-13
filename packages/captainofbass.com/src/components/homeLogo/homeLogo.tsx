'use client'
import Fade from '@mui/material/Fade'
import { useScrollPosition } from '@websites/shared/react'
import Image from 'next/image'
import { ReactElement } from 'react'

export default function HomeLogo(): ReactElement {
  const scrollY = useScrollPosition()
  return (
    <Fade in={!scrollY}>
      <Image
        src="/images/cpt-border.png"
        alt="logo"
        width={617}
        height={181}
        style={{
          maxWidth: '90vw',
          height: '22vh',
          marginTop: 'calc(100vh - 24vh - 130px)'
        }}
      />
    </Fade>
  )
}
