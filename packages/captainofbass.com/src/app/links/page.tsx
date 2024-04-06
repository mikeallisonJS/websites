'use client'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha
} from '@mui/material'
import AudiusIcon from '@mui/icons-material/CurrencyBitcoin'
import DonateIcon from '@mui/icons-material/Paid'
import EmailIcon from '@mui/icons-material/Email'
import EPKIcon from '@mui/icons-material/Newspaper'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MixCloudIcon from '@mui/icons-material/Cloud'
import SoundCloudIcon from '@mui/icons-material/CloudUpload'
import SpotifyIcon from '@mui/icons-material/GraphicEq'
import TwitterIcon from '@mui/icons-material/Twitter'
import YoutubeIcon from '@mui/icons-material/YouTube'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function Music(): ReactElement {
  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginBottom: '20px'
        }}
      >
        <CardHeader title="Where to find Captain" />
        <CardContent>
          <nav>
            <List>
              <Link href="/epk">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EPKIcon />
                    </ListItemIcon>
                    <ListItemText primary="Electronic Press Kit (EPK)" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/donate">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <DonateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Donate" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link
                href="https://open.spotify.com/artist/4XHSbdpOsFpEWPOdj9nxfH"
                target="_blank"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SpotifyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Spotify" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://soundcloud.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SoundCloudIcon />
                    </ListItemIcon>
                    <ListItemText primary="SoundCloud" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://mixcloud.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MixCloudIcon />
                    </ListItemIcon>
                    <ListItemText primary="MixCloud" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://mixcloud.com/mikeallison" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MixCloudIcon />
                    </ListItemIcon>
                    <ListItemText primary="MixCloud (pre Captain)" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://audius.co/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AudiusIcon />
                    </ListItemIcon>
                    <ListItemText primary="Audius" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="http://instagram.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InstagramIcon />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="http://youtube.com/c/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <YoutubeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Youtube" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="http://facebook.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FacebookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="http://x.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TwitterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="www.linkedin.com/in/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LinkedInIcon />
                    </ListItemIcon>
                    <ListItemText primary="LinkedIn" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="mailto:mike@captainofbass.com" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
        </CardContent>
      </Card>
    </Box>
  )
}
