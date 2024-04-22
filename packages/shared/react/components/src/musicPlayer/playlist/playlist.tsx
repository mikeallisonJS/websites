import ReactDraggableList from 'react-draggable-list'

import PlaylistItemTemplate from './playlistItemTemplate'
import { RefObject, createRef } from 'react'
import { Track } from '../types'
import { useMusicStore } from '../useMusicStore'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@websites/shared/react/lib'

type PlaylistProps = {
  audioRef: RefObject<HTMLAudioElement>
  className?: string
}
export default function Playlist({ className, audioRef }: PlaylistProps) {
  const { playlist, currentTrack, setCurrentTrack, setPlaylist } =
    useMusicStore(useShallow((state) => state))

  const onReorder = (newList: Track[]) => setPlaylist(newList)
  const onTrackSelect = (index: number) => {
    if (audioRef.current != null) audioRef.current.src = playlist[index].source
    setCurrentTrack(index)
  }

  const draggablelistContainerRef = createRef<HTMLDivElement>()

  return (
    <div
      className={cn('w-[10vw] h-[10vh]', className)}
      ref={draggablelistContainerRef}
    >
      {/* sx={{
        margin: (theme) => theme.spacing(),
      }} */}{' '}
      {playlist.length > 0 ? (
        <ReactDraggableList
          list={playlist}
          itemKey="ID"
          template={PlaylistItemTemplate}
          onMoveEnd={onReorder}
          container={() => draggablelistContainerRef.current}
          commonProps={{
            listOfID: playlist.map((element: Track) => element?.ID),
            currentTrackID: playlist[currentTrack]?.ID,
            onTrackSelect: onTrackSelect
          }}
        />
      ) : null}
    </div>
  )
}
