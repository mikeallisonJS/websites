'use client'

import { ReactNode, useRef, useEffect } from 'react'

import { cn } from '@websites/shared/react/lib'

import { Drawer, DrawerContent } from '../drawer'

import { useMusicPlayerContext } from './context'
import Controls from './controls'
import CoverArt from './coverArt'
import Playlist from './playlist'
import PlaylistControl from './playlistControl'
import ProgressBar from './progressBar'
import TrackDetails from './trackDetails'
import VolumeControl from './volumeControl'

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
    closeDrawer,
    currentTime,
    currentTrack,
    currentTrackIndex,
    duration,
    isDrawerOpen,
    openDrawer,
    play,
    playlist,
    repeatMode,
    seek,
    shuffled,
    setAudioRef,
    setRepeatMode,
    setShuffled,
    setCurrentTrackIndex,
    setVolume,
    volume
  } = useMusicPlayerContext((s) => s)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioRef(audioRef.current)
  }, [audioRef, setAudioRef])

  const onPlaylistSelect = (index: number) => {
    setCurrentTrackIndex(index)
    play()
    closeDrawer()
  }

  return (
    <div
      className={cn(
        'z-50 w-[100vw] h-[62px] flex align-middle fixed bottom-0 box-border overflow-hidden bg-popover px-1 text-popover-foreground shadow-md ',
        className
      )}
    >
      <audio ref={audioRef} src={playlist?.[0].source} />
      <div className="w-full h-1"></div>
      <div
        className={cn(
          'flex flex-row w-full justify-between items-center flex-nowrap',
          className
        )}
      >
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
          isPlaylistOpen={isDrawerOpen}
          onOpenDrawer={openDrawer}
          onCloseDrawer={closeDrawer}
          repeatMode={repeatMode}
          shuffled={shuffled}
          onRepeatModeChange={setRepeatMode}
          onShuffledChange={setShuffled}
          className="hidden md:flex"
        />
      </div>

      <Drawer open={isDrawerOpen && !disableDrawer} onClose={closeDrawer}>
        <DrawerContent className={className}>
          <div className="flex md:hidden pt-2">
            <div
              className={cn(
                'flex flex-col justify-end items-stretch flex-nowrap w-full h-full'
              )}
            >
              <div
                className={cn(
                  'flex flex-col justify-center items-center flex-nowrap grow-1',
                  className
                )}
              >
                <CoverArt
                  src={currentTrack?.coverArt ?? defaultArt}
                  className="children h-[300px] w-[300px] shadow-md"
                />
                <TrackDetails
                  title={playlist?.[currentTrackIndex]?.title ?? ''}
                  artist={playlist?.[currentTrackIndex]?.artist ?? ''}
                  className="mt-1 text-center"
                />
              </div>
              <ProgressBar
                currentTime={currentTime}
                onSeek={seek}
                duration={duration}
              />
              <Controls disabled={currentTrack == null} />
              <VolumeControl volume={volume} onVolumeChange={setVolume} />
              <PlaylistControl
                isPlaylistOpen={isDrawerOpen}
                onOpenDrawer={openDrawer}
                onCloseDrawer={closeDrawer}
                repeatMode={repeatMode}
                shuffled={shuffled}
                onRepeatModeChange={setRepeatMode}
                onShuffledChange={setShuffled}
              />
            </div>
          </div>
          <div className="hidden md:flex pt-2 pb-[62px]">
            <Playlist
              currentTrack={currentTrack}
              playlist={playlist}
              onPlaylistSelect={onPlaylistSelect}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
