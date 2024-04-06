'use client'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  alpha
} from '@mui/material'
import { ReactElement } from 'react'
import { songs } from '../../components/footer/footer'
import { PlayerInterface } from 'react-material-music-player'

export default function Music(): ReactElement {
  const onSelect = (id: string): void => {
    const index = songs.findIndex((song) => song.ID === id)
    PlayerInterface.changeTrack(index)
    PlayerInterface.play(null)
  }
  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2),
          marginBottom: '20px'
        }}
      >
        <CardHeader title="Originals" />
        <CardContent>
          <nav>
            <List>
              {songs
                .filter((song) => song.artist.includes('Captain'))
                .map((song) => (
                  <ListItem key={song.ID} disablePadding>
                    <ListItemButton onClick={() => onSelect(song.ID)}>
                      {song.artist} - {song.title}
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </nav>
        </CardContent>
      </Card>

      <Card
        sx={{
          background: (theme) => alpha(theme.palette.background.paper, 0.2)
        }}
      >
        <CardHeader title="Remixes" />
        <CardContent>
          <List>
            {songs
              .filter((song) => !song.artist.includes('Captain'))
              .map((song) => (
                <ListItem key={song.ID} disablePadding>
                  <ListItemButton onClick={() => onSelect(song.ID)}>
                    {song.artist} - {song.title}
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
