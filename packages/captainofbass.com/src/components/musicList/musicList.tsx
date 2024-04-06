'use client'
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  alpha
} from '@mui/material'
import { ReactElement } from 'react'
import { PlayerInterface } from 'react-material-music-player'
import { songs } from '../footer/footer'

export enum MusicType {
  Originals = 'Originals',
  Remixes = 'Remixes'
}

export type MusicListProps = {
  type: MusicType
}
export default function MusicList({ type }: MusicListProps): ReactElement {
  const onSelect = (id: string): void => {
    const index = songs.findIndex((song) => song.ID === id)
    PlayerInterface.changeTrack(index)
    PlayerInterface.play(null)
  }
  const songDisplay =
    type === MusicType.Originals
      ? songs.filter((song) => song.artist.includes('Captain'))
      : songs.filter((song) => !song.artist.includes('Captain'))
  return (
    <Card
      sx={{
        background: (theme) => alpha(theme.palette.background.paper, 0.2),
        marginBottom: '20px'
      }}
    >
      <CardHeader title={type} />
      <CardContent>
        <nav>
          <List>
            {songDisplay.map((song) => (
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
  )
}
