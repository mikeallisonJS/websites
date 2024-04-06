'use client'

import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  Grow,
  IconButton,
  Toolbar,
  alpha
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Image from 'next/image'
import { ReactElement, forwardRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const images = [
  'dystopia-24-3.jpg',
  'sltdnb-24-1.png',
  'sltdnb-23-12.png',
  'dnbal-23-10.jpeg',
  'sltdnb-23-9.png',
  'sltdnb-23-7.png',
  'sltdnb-23-5.png',
  'dnbal-23-4.jpeg',
  'uv-23-2.png',
  'uv-23-1.png',
  'uv-22-12.png',
  'dnbatthelake2.jpeg',
  'dnbatthelake.jpeg',
  'uv-22-5.png',
  'eventhorizon.jpeg',
  'uv-22-2.png',
  'uv-21-12.png',
  'welcomehome.png',
  'skrillex.jpg',
  'tittsworth.jpg',
  'potd.JPG',
  'redbull.jpg',
  'mrk1.jpg',
  'skynet.jpg',
  'phace.JPG',
  'potd2.JPG',
  'vaski.jpg',
  'ufo.JPG',
  'teebee.jpg',
  'yes.jpg',
  'mwff.JPG',
  'hybrid.JPG',
  'yes2.JPG',
  'nightrain.JPG',
  'bassic.JPG',
  'delano.JPG',
  'unify.jpg',
  'wildthings.JPG',
  'pj.jpg',
  'pleasure.jpg',
  'food10.jpg',
  'move.jpg',
  'dfuse.jpg',
  'tps.jpg'
]

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />
})

export default function PastEvents(): ReactElement {
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
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                key={index}
                spacing={5}
                textAlign="center"
              >
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
