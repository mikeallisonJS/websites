'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mikeallisonjs/ui/components/table'
import Image from 'next/image'

import { songs } from '@/app/_footer/footer'
import { useMusicPlayerContext } from '@/app/_footer/music-player/context'
import { GlassContainer } from '@/components/glassContainer'

export enum MusicType {
  Originals = 'Originals',
  Remixes = 'Remixes'
}

export type MusicListProps = {
  type: MusicType
}
export default function MusicList({ type }: MusicListProps) {
  const { setCurrentTrackIndex, play } = useMusicPlayerContext((s) => s)
  const onSelect = (id: string): void => {
    const index = songs.findIndex((song) => song.ID === id)
    setCurrentTrackIndex(index)
    play()
  }
  const songDisplay =
    type === MusicType.Originals
      ? songs.filter((song) => song.artist.includes('Captain'))
      : songs.filter((song) => !song.artist.includes('Captain'))
  return (
    <GlassContainer>
      <div className="text-3xl">{type} </div>
      <Table>
        <TableBody>
        {songDisplay.map((song) => (
          <TableRow
            key={song.ID}
            onClick={() => onSelect(song.ID)}
            className="cursor-pointer text-left"
          >
            <TableCell className="w-24">
              <Image
                src={song.coverArt}
                alt={song.title}
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell className="w-80">{song.artist}</TableCell>
            <TableCell>{song.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassContainer>
  )
}
