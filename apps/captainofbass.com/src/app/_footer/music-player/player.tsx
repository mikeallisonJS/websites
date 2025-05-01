'use client'

import {
  Drawer,
  DrawerContent,
  DrawerTitle
} from '@mikeallisonjs/ui/components/drawer'
import { cn } from '@mikeallisonjs/ui/lib/utils'
import { useEffect, useRef } from 'react'

import BrowserCompatibilityAlert from './browser-compatibility-alert'
import { useMusicPlayerContext } from './context'
import Controls from './controls'
import CoverArt from './cover-art'
import Playlist from './playlist'
import PlaylistControl from './playlist-control'
import ProgressBar from './progress-bar'
import TrackDetails from './track-details'
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
    volume,
    showBrowserAlert,
    hideBrowserAlert
  } = useMusicPlayerContext((s) => s)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setAudioRef(audioRef.current)
  }, [setAudioRef])

  const onPlaylistSelect = (index: number) => {
    setCurrentTrackIndex(index)
    play()
    closeDrawer()
  }

  return (
    <div
      className={cn(
        'bg-popover text-popover-foreground bottom-0 z-10 box-border flex h-[62px] w-[100vw] px-1 align-middle shadow-md ',
        className,
        'bg-white/60 fixed overflow-hidden'
      )}
    >
      <audio
        ref={audioRef}
        src={
          playlist && playlist.length > 0 && playlist[0] && playlist[0].source
            ? playlist[0].source
            : ''
        }
      />
      <BrowserCompatibilityAlert
        isOpen={showBrowserAlert}
        onClose={hideBrowserAlert}
      />
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
          className="grow-6 hidden md:flex"
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
        <DrawerContent
          className={cn('z-20 md:z-0 md:pb-[62px]', className, 'bg-white/60')}
        >
          <DrawerTitle>Playlist</DrawerTitle>
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
