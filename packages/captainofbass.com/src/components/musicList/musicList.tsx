'use client'

// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import CardHeader from '@mui/material/CardHeader'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemButton from '@mui/material/ListItemButton'
// import { alpha } from '@mui/material/styles'
// import { TableCell } from '@mui/material'
import { PlayerInterface } from 'react-material-music-player'

import { Table, TableCell, TableRow } from '@websites/shared/react/components'

import { songs } from '../footer/footer'
import { GlassContainer } from '../glassContainer'

export enum MusicType {
  Originals = 'Originals',
  Remixes = 'Remixes'
}

export type MusicListProps = {
  type: MusicType
}
export default function MusicList({ type }: MusicListProps) {
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
    <GlassContainer>
      <div className="text-3xl">{type} </div>
      <Table>
        {songDisplay.map((song) => (
          <TableRow
            key={song.ID}
            onClick={() => onSelect(song.ID)}
            className="text-left cursor-pointer"
          >
            <TableCell>
              {song.artist} - {song.title}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </GlassContainer>
  )
}
