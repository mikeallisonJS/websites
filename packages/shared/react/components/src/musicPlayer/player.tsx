'use client'

import { useRef, useEffect } from 'react'

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
    isPlaying,
    openDrawer,
    play,
    pause,
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
        'bg-popover text-popover-foreground fixed bottom-0 z-10 box-border flex h-[62px] w-[100vw] overflow-hidden px-1 align-middle shadow-md ',
        className
      )}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio ref={audioRef} src={playlist?.[0].source} />
      {/* <div className="w-full h-1"></div> */}
      <div
        className={cn(
          'flex w-full flex-row flex-nowrap items-center justify-between',
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
          className="grow-1 m-1 shrink-0 text-left md:w-[120px]"
        />
        <Controls
          disabled={currentTrack == null}
          currentTrackIndex={currentTrackIndex}
          onPlay={play}
          onPause={pause}
          onChangeCurrentTrackIndex={setCurrentTrackIndex}
          isPlaying={isPlaying}
          isDrawerOpen={isDrawerOpen}
          playlist={playlist}
        />
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
        />
      </div>

      <Drawer
        open={isDrawerOpen && !disableDrawer}
        onClose={closeDrawer}
        modal={false}
      >
        <DrawerContent className={cn('z-20 md:z-0 md:pb-[62px]', className)}>
          <div className="flex pt-2 md:hidden">
            <div
              className={cn(
                'flex h-full w-full flex-col flex-nowrap items-stretch justify-end'
              )}
            >
              <div
                className={cn(
                  'grow-1 flex flex-col flex-nowrap items-center justify-center',
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
              <Controls
                disabled={currentTrack == null}
                currentTrackIndex={currentTrackIndex}
                onPlay={play}
                onPause={pause}
                onChangeCurrentTrackIndex={setCurrentTrackIndex}
                isPlaying={isPlaying}
                isDrawerOpen={isDrawerOpen}
                playlist={playlist}
              />
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
          <div className="hidden pt-2 md:flex">
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
