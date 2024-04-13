'use client'

import CloseIcon from '@mui/icons-material/Close'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import { alpha } from '@mui/material/styles/'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'
import Image from 'next/image'
import { ReactElement, forwardRef, useState, Ref } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement
  },
  ref: Ref<unknown>
) {
  return <Grow ref={ref} {...props} />
})

type PastEventsProps = {
  images: string[]
}
export default function PastEvents({ images }: PastEventsProps): ReactElement {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )
  const select = (index: number): void => {
    setSelectedImage(images[index])
  }
  const handleClose = (): void => {
    setSelectedImage(undefined)
  }
  return (
    <Box my={5}>
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2)
        }}
      >
        <CardHeader title="Past Events" />
        {/* <Typography variant="h2">Past Events</Typography> */}
        <CardContent>
          <Grid container>
            {images.map((image, index) => (
              <Grid item md={4} sm={12} xs={12} key={index} textAlign="center">
                <Image
                  src={`/images/flyers/${image}`}
                  alt={`flyer - ${image}`}
                  onClick={() => select(index)}
                  width={300}
                  height={300}
                  style={{
                    cursor: 'pointer',
                    width: '20vw',
                    minWidth: '200px',
                    marginTop: '20px'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={selectedImage !== undefined}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Image
          src={`/images/flyers/${selectedImage}`}
          alt="selected flyer"
          style={{ objectFit: 'contain' }}
          fill
        />
      </Dialog>
    </Box>
  )
}
