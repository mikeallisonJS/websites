'use client'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  alpha
} from '@mui/material'
import { ReactElement } from 'react'
import Bio from '../../components/bio/bio'
import Link from 'next/link'
import { PageContainer } from '@websites/shared/react'

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
