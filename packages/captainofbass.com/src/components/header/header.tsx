'use client'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'
import theme from '../../app/theme'
import { Fade, Stack, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useScrollPosition } from '@websites/shared/react'

export default function Header(): ReactElement {
  const path = usePathname()
  const scrollY = useScrollPosition()

  return (
    <>
      <AppBar
        className={scrollY === 0 && path === '/' ? 'topScroll' : ''}
        position="fixed"
        sx={{
          top: 0
        }}
      >
        <Toolbar disableGutters>
          <Box
            className="logo"
            sx={{
              flexGrow: 1,
              [theme.breakpoints.down('md')]: {
                textAlign: 'center'
              }
            }}
          >
            <Fade in={!(path === '/' && scrollY === 0)}>
              <Image
                className="logo"
                src="/images/cpt-border.png"
                alt="logo"
                height={64}
                width={218}
              />
            </Fade>
          </Box>
          <Stack spacing={2} direction="row" mr={2}>
            <Link href="/">
              <Typography variant="h6">HOME</Typography>
            </Link>
            <Link href="/music">
              <Typography variant="h6">MUSIC</Typography>
            </Link>
            <Link href="/links">
              <Typography variant="h6">LINKS</Typography>
            </Link>
            <Link href="https://captainssounds.com" target="_blank">
              <Typography variant="h6">STORE</Typography>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
