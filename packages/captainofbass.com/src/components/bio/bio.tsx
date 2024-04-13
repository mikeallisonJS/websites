'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

export default function Bio(): ReactElement {
  const path = usePathname()
  return (
    <Card
      sx={{
        background: (theme) => alpha(theme.palette.background.paper, 0.2)
      }}
    >
      {path === '/epk' && <CardHeader title="Bio" />}
      <CardContent>
        <Typography variant="body1" textAlign="left">
          Since the late 90s Mike Allison has been a staple in the Electronic
          Music scene as a DJ, producer, promoter and supporter. After 20+ years
          in the Southeast, he is now bringing his signature sounds to the West
          Coast under the name Captain. As a founder and resident of both SLTDNB
          and Ultraviolet, he has brought a new following and celebration of
          Drum and Bass to South Lake Tahoe.
        </Typography>
      </CardContent>
    </Card>
  )
}
