import ReactDraggableList from 'react-draggable-list'

import PlaylistItemTemplate from './playlistItemTemplate'
import { createRef } from 'react'
import { Track } from '../types'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@websites/shared/react/lib'
import { useMusicPlayerContext } from '../context'

type PlaylistProps = {
  className?: string
}
export default function Playlist({ className }: PlaylistProps) {
  const { playlist, currentTrack, setCurrentTrackIndex, setPlaylist } =
    useMusicPlayerContext((s) => s)

  const onReorder = (newList: Track[]) => setPlaylist(newList)
  const onTrackSelect = (index: number) => setCurrentTrackIndex(index)

  const draggablelistContainerRef = createRef<HTMLDivElement>()

  return (
    <div
      className={cn('w-[10vw] h-[10vh]', className)}
      ref={draggablelistContainerRef}
    >
      {playlist.length > 0 ? (
        <ReactDraggableList
          list={playlist}
          itemKey="ID"
          template={PlaylistItemTemplate}
          onMoveEnd={onReorder}
          container={() => draggablelistContainerRef.current}
          commonProps={{
            listOfID: playlist.map((element: Track) => element?.ID),
            currentTrackID: currentTrack?.ID,
            onTrackSelect: onTrackSelect
          }}
        />
      ) : null}
    </div>
  )
}
