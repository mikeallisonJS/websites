'use client'

import { useState, ReactNode, useRef, LegacyRef, useEffect } from 'react'

import CoverArt from './coverArt'
import TrackDetails from './trackDetails'
import ProgressBar from './progressBar'
import Controls from './controls'
import VolumeControl from './volumeControl'
import PlaylistControl from './playlist/playlistControl'
import { useMusicStore } from './useMusicStore'
import { Drawer, DrawerContent } from '../drawer'
import { cn } from '@websites/shared/react/lib'
import { useShallow } from 'zustand/react/shallow'
import { Track } from './types'

const PREFIX = 'Player'

type RootPaperProps = {
  children: ReactNode
  className?: string
  ref: LegacyRef<HTMLDivElement>
}

const RootPaper = ({ children, className, ref }: RootPaperProps) => (
  <div
    ref={ref}
    className={cn(
      'z-50 w-[100vw] h-[62px] flex align-middle fixed bottom-0 box-border overflow-hidden bg-popover px-1 text-popover-foreground shadow-md ',
      //
      className
    )}
  >
    {children}
  </div>
)

type RowBoxProps = {
  children: ReactNode
  className?: string
  onClick: () => void
}
const RowBox = ({ children, onClick, className }: RowBoxProps) => (
  <div
    className={cn(
      'flex flex-row w-full justify-between items-center flex-nowrap',
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

type ColumnBoxProps = {
  children: ReactNode
}
const ColumnBox = ({ children }: ColumnBoxProps) => (
  <div
    className={cn(
      'flex flex-col justify-end items-stretch flex-nowrap w-full h-full'
    )}
  >
    {children}
  </div>
)

type CenterChildBoxProps = {
  children: ReactNode
  className?: string
}

const CenterChildBox = ({ children, className }: CenterChildBoxProps) => (
  <div
    className={cn(
      'flex flex-col justify-center items-center flex-nowrap',
      className
    )}
  >
    {children}
  </div>
)

type PlayerProps = {
  disableDrawer?: boolean
  defaultArt?: string
  className?: string
  playlist?: Track[]
}

export default function Player({
  disableDrawer = false,
  defaultArt,
  className,
  playlist: initialPlaylist
}: PlayerProps) {
  const [maximised, setMaximised] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    currentTrack,
    isPlaying,
    playlist,
    repeatMode,
    shuffled,
    setCurrentTrack,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setPlaylist
  } = useMusicStore(useShallow((state) => state))

  const handleChangeTrack = (index: number) => {
    if (audioRef.current == null) return
    setCurrentTime(0)
    setCurrentTrack(index)
    audioRef.current.src = playlist[index].source
    audioRef.current.play()
  }

  const handlePlay = () => {
    if (audioRef.current == null) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    if (audioRef.current == null) return
    audioRef.current.ondurationchange = () => {
      setDuration(audioRef.current?.duration ?? 0)
    }
    audioRef.current.onended = () => {
      if (audioRef.current == null) return
      if (shuffled) {
        const nextTrack = Math.round(Math.random() * playlist.length)
        handleChangeTrack(nextTrack)
      } else {
        if (repeatMode === 'REPEAT_ONE') {
          handleChangeTrack(currentTrack)
        } else {
          const nextTrack =
            currentTrack >= playlist.length - 1 ? 0 : currentTrack + 1
          handleChangeTrack(nextTrack)
        }
      }
    }
  }, [audioRef])

  if (initialPlaylist !== undefined) {
    setPlaylist(initialPlaylist)
  }

  const openSwipeableDrawer = () => {
    if (!disableDrawer) {
      setMaximised(true)
    }
  }

  const closeSwipeableDrawer = () => {
    if (maximised) {
      setMaximised(false)
    }
  }

  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <RootPaper ref={rootRef} className={className}>
      <audio ref={audioRef} src={initialPlaylist?.[0].source} />
      {!maximised && (
        <RowBox onClick={openSwipeableDrawer}>
          <CoverArt
            src={playlist[currentTrack]?.coverArt ?? defaultArt}
            className="h-[48px] w-[48px] shrink-0"
          />
          <TrackDetails className="md:w-[120px] grow-1 text-left m-1 shrink-0" />
          <Controls
            onChangeTrack={handleChangeTrack}
            onPlay={handlePlay}
            disabled={playlist[currentTrack] === undefined}
          />
          <ProgressBar audioRef={audioRef} className=" grow-6 hidden md:flex" />
          <VolumeControl
            audioRef={audioRef}
            className=" grow-2 hidden md:flex"
          />
          <PlaylistControl
            audioRef={audioRef}
            playlistViewMode="popover"
            className="hidden md:flex"
          />
        </RowBox>
      )}

      <div className="md:hidden">
        <Drawer open={maximised} onOpenChange={closeSwipeableDrawer}>
          <DrawerContent>
            <div
              className={`${PREFIX}-swipeable-puller`}
              onClick={closeSwipeableDrawer}
            />
            <ColumnBox>
              {/* grow and center cover art */}
              <CenterChildBox className="grow-1">
                <CoverArt
                  src={playlist[currentTrack]?.coverArt ?? defaultArt}
                  className="children h-[300px] w-[300px] shadow-md"
                />
                <TrackDetails className="mt-1 text-center" />
              </CenterChildBox>
              <ProgressBar audioRef={audioRef} />
              <Controls
                onChangeTrack={handleChangeTrack}
                onPlay={handlePlay}
                disabled={playlist[currentTrack] === undefined}
              />
              <VolumeControl audioRef={audioRef} />
              <PlaylistControl audioRef={audioRef} playlistViewMode="expand" />
            </ColumnBox>
          </DrawerContent>
        </Drawer>
      </div>
    </RootPaper>
  )
}
