'use client'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ReactElement, useState } from 'react'
import theme from '../../app/theme'
import {
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useScrollPosition } from '@websites/shared/react'
import MenuIcon from '@mui/icons-material/Menu'

export default function Header(): ReactElement {
  const path = usePathname()
  const scrollY = useScrollPosition()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null)
  }
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
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              <Link href="/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              <Link href="/music">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Music</Typography>
                </MenuItem>
              </Link>
              <Link href="/links">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Links</Typography>
                </MenuItem>
              </Link>
              <Link href="https://captainssounds.com">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Store</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
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
          <Stack
            spacing={2}
            direction="row"
            mr={2}
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'none'
              }
            }}
          >
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
