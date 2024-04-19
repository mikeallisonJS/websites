'use client'
import Fade from '@mui/material/Fade'
import { useScrollPosition } from '@websites/shared/react/lib'
import Image from 'next/image'

export default function HomeLogo() {
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
