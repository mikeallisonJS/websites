'use client'

import { useState, ReactNode, useRef, useEffect } from 'react'

import { cn } from '@websites/shared/react/lib'

import { Drawer, DrawerContent } from '../drawer'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'

import { useMusicPlayerContext } from './context'
import Controls from './controls'
import CoverArt from './coverArt'
import Playlist from './playlist/playlist'
import PlaylistControl from './playlist/playlistControl'
import ProgressBar from './progressBar'
import TrackDetails from './trackDetails'
import VolumeControl from './volumeControl'

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
    currentTime,
    currentTrack,
    currentTrackIndex,
    duration,
    isPlaylistOpen,
    playlist,
    repeatMode,
    seek,
    shuffled,
    setAudioRef,
    setRepeatMode,
    setShuffled,
    setCurrentTrackIndex,
    setVolume,
    togglePlaylistOpen,
    volume
  } = useMusicPlayerContext((s) => s)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioRef(audioRef.current)
  }, [audioRef, setAudioRef])

  return (
    <RootPaper className={className}>
      <audio ref={audioRef} src={playlist?.[0].source} />
      <RowBox onClick={togglePlaylistOpen}>
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
        <ProgressBar
          currentTime={currentTime}
          onSeek={seek}
          duration={duration}
          className=" grow-6 hidden md:flex"
        />
        <VolumeControl
          volume={volume}
          onVolumeChange={setVolume}
          className=" grow-2 hidden md:flex"
        />
        <PlaylistControl
          isPlaylistOpen={isPlaylistOpen}
          onShowPlaylistToggle={togglePlaylistOpen}
          repeatMode={repeatMode}
          shuffled={shuffled}
          onRepeatModeChange={setRepeatMode}
          onShuffledChange={setShuffled}
          className="hidden md:flex"
        />
      </RowBox>

      <Drawer open={isPlaylistOpen}>
        <DrawerContent className={className}>
          <div className="flex md:hidden pt-2">
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
              <ProgressBar
                currentTime={currentTime}
                onSeek={seek}
                duration={duration}
              />
              <Controls disabled={currentTrack == null} />
              <VolumeControl volume={volume} onVolumeChange={setVolume} />
              <PlaylistControl
                isPlaylistOpen={isPlaylistOpen}
                onShowPlaylistToggle={togglePlaylistOpen}
                repeatMode={repeatMode}
                shuffled={shuffled}
                onRepeatModeChange={setRepeatMode}
                onShuffledChange={setShuffled}
              />
            </ColumnBox>
          </div>
          <div className="hidden md:flex pt-2 pb-[62px]">
            <Playlist
              currentTrack={currentTrack}
              playlist={playlist}
              onTrackIndexChange={setCurrentTrackIndex}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </RootPaper>
  )
}
