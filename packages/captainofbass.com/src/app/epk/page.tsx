'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { PageContainer } from '@websites/shared/react'
import Link from 'next/link'
import { ReactElement } from 'react'

import Bio from '../../components/bio/bio'

export default function Epk(): ReactElement {
  return (
    <PageContainer>
      <Bio />
      <Divider />
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginY: '20px'
        }}
      >
        <CardHeader title="Testimonials" />
        <CardContent sx={{ textAlign: 'left' }}>
          <Card
            sx={{
              background: (theme) => alpha(theme.palette.background.paper, 0.2),
              marginBottom: '20px'
            }}
          >
            <CardContent>
              <div>
                &quot;Clever with a touch of amazing&quot;
                <br />- CM (Promoter)
              </div>
            </CardContent>
          </Card>
          <Card
            sx={{
              background: (theme) => alpha(theme.palette.background.paper, 0.2),
              marginBottom: '20px'
            }}
          >
            <CardContent>
              <div>
                &quot;When passion and precision destroy the ideology of
                genres&quot;
                <br />- TM (Attendee)
              </div>
            </CardContent>
          </Card>
          <Card
            sx={{
              background: (theme) => alpha(theme.palette.background.paper, 0.2),
              marginBottom: '20px'
            }}
          >
            <CardContent>
              <div>
                &quot;Untz untz womp womp&quot;
                <br />- HK (Indusry Insider & Promoter)
              </div>
            </CardContent>
          </Card>
          <Card
            sx={{
              background: (theme) => alpha(theme.palette.background.paper, 0.2),
              marginBottom: '20px'
            }}
          >
            <CardContent>
              <div>
                &quot;This is like the first time I took MDMA&quot;
                <br />
                -&nbsp;(Attendee)
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Divider />
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginY: '20px'
        }}
      >
        <CardHeader title="Downloads" />
        <CardContent>
          <List>
            <Link href="/assets/captain-media.zip">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Media files (logo/pic) 1.76 MB" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="assets/captain-technical-rider.pdf">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Technical / Performance Rider 358 KB" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </CardContent>
      </Card>
      <Divider />
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginBottom: '20px'
        }}
      >
        <CardHeader title="Inquiries" />
        <CardContent>
          <Typography variant="body1" textAlign="left">
            Email:&nbsp;
            <Link href="mailto:booking@captainofbass.com">
              booking&#64;captainofbass.com
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </PageContainer>
  )
}
