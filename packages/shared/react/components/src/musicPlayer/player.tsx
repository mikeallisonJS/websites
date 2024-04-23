'use client'

import { useState, ReactNode, useRef, useEffect } from 'react'

import CoverArt from './coverArt'
import TrackDetails from './trackDetails'
import ProgressBar from './progressBar'
import Controls from './controls'
import VolumeControl from './volumeControl'
import PlaylistControl from './playlist/playlistControl'
import { Drawer, DrawerContent } from '../drawer'
import { cn } from '@websites/shared/react/lib'
import { Track } from './types'
import { useMusicPlayerContext } from './context'

const PREFIX = 'Player'

type RootPaperProps = {
  children: ReactNode
  className?: string
}

const RootPaper = ({ children, className }: RootPaperProps) => (
  <div
    className={cn(
      'z-50 w-[100vw] h-[62px] flex align-middle fixed bottom-0 box-border overflow-hidden bg-popover px-1 text-popover-foreground shadow-md ',
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
}

export default function Player({
  disableDrawer = false,
  defaultArt,
  className
}: PlayerProps) {
  const {
    currentTrack,
    currentTrackIndex,
    playlist,
    setAudioRef,
    setPlaylist
  } = useMusicPlayerContext((s) => s)
  const [maximised, setMaximised] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioRef(audioRef.current)
  }, [audioRef])

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

  return (
    <RootPaper className={className}>
      <audio ref={audioRef} src={playlist?.[0].source} />
      {!maximised && (
        <RowBox onClick={openSwipeableDrawer}>
          <CoverArt
            src={currentTrack?.coverArt ?? defaultArt}
            className="h-[48px] w-[48px] shrink-0"
          />
          <TrackDetails
            title={currentTrack?.title ?? ''}
            artist={currentTrack?.artist ?? ''}
            className="md:w-[120px] grow-1 text-left m-1 shrink-0"
          />
          <Controls disabled={currentTrack == null} />
          <ProgressBar className=" grow-6 hidden md:flex" />
          <VolumeControl className=" grow-2 hidden md:flex" />
          <PlaylistControl
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
              <CenterChildBox className="grow-1">
                <CoverArt
                  src={currentTrack?.coverArt ?? defaultArt}
                  className="children h-[300px] w-[300px] shadow-md"
                />
                <TrackDetails
                  title={playlist?.[currentTrackIndex]?.title ?? ''}
                  artist={playlist?.[currentTrackIndex]?.artist ?? ''}
                  className="mt-1 text-center"
                />
              </CenterChildBox>
              <ProgressBar />
              <Controls disabled={currentTrack == null} />
              <VolumeControl />
              <PlaylistControl playlistViewMode="expand" />
            </ColumnBox>
          </DrawerContent>
        </Drawer>
      </div>
    </RootPaper>
  )
}
