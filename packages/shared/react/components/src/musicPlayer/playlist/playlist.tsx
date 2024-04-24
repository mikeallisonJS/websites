import ReactDraggableList from 'react-draggable-list'

import PlaylistItem from './playlistItem'
import { createRef } from 'react'
import { Track } from '../types'
import { cn } from '@websites/shared/react/lib'
import { useMusicPlayerContext } from '../context'

type PlaylistProps = {
  playlist: Track[]
  currentTrack: Track | null
  onTrackIndexChange: (index: number) => void
  onPlaylistChange: (newList: Track[]) => void
  className?: string
}
export default function Playlist({
  className,
  playlist,
  currentTrack,
  onTrackIndexChange,
  onPlaylistChange
}: PlaylistProps) {
  const onReorder = (newList: Track[]) => onPlaylistChange(newList)
  const onTrackSelect = (index: number) => onTrackIndexChange(index)

  const draggablelistContainerRef = createRef<HTMLDivElement>()

  return (
    <div
      className={cn('w-[10vw] h-[10vh]', className)}
      ref={draggablelistContainerRef}
    >
      {playlist.map((track: Track) => (
        <PlaylistItem
          key={track.ID}
          track={track}
          playlist={playlist}
          currentTrack={currentTrack}
          onTrackSelect={onTrackSelect}
        />
      ))}
    </div>
  )
}
