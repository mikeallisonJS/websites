'use client'
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  alpha
} from '@mui/material'
import { PageContainer } from '@websites/shared/react'
import Link from 'next/link'
import { ReactElement } from 'react'

export default function Donate(): ReactElement {
  return (
    <PageContainer>
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginBottom: '20px'
        }}
      >
        <CardHeader title="Show some love and help me keep the lights on" />
        <CardContent>
          <nav>
            <List>
              <Link href="http://paypal.me/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Paypal" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://venmo.com/captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Venmo" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="https://cash.app/$captainofbass" target="_blank">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="CashApp" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </nav>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
