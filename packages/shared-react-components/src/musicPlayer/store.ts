'use client'

import { createStore } from 'zustand'

import { RepeatMode, type Track } from './types'

export interface MusicStoreProps {
  audioRef: HTMLAudioElement | null
  currentTrack: Track | null
  currentTrackIndex: number
  currentTime: number
  duration: number
  isDrawerOpen: boolean
  isPlaying: boolean
  playlist: Track[]
  repeatMode: RepeatMode
  shuffled: boolean
  volume: number
}
export interface MusicState extends MusicStoreProps {
  closeDrawer: () => void
  openDrawer: () => void
  pause: () => void
  play: () => void
  seek: (progress: number) => void
  setAudioRef: (audioRef: HTMLAudioElement | null) => void
  setCurrentTrackIndex: (index: number) => void
  setPlaylist: (playlist: Track[]) => void
  setRepeatMode: (repeatMode: RepeatMode) => void
  setShuffled: (shuffled: boolean) => void
  setVolume: (volume: number) => void
}

export type MusicStore = ReturnType<typeof createMusicStore>

export const createMusicStore = (initProps?: Partial<MusicStoreProps>) => {
  const DEFAULT_PROPS = {
    audioRef: null,
    currentTime: 0,
    currentTrack: null,
    currentTrackIndex: 0,
    duration: 0,
    isDrawerOpen: false,
    isPlaying: false,
    playlist: [],
    repeatMode: RepeatMode.NORMAL,
    shuffled: false,
    volume: 100
  }
  const mergedProps = { ...DEFAULT_PROPS, ...initProps }

  return createStore<MusicState>((set, get) => ({
    ...mergedProps,
    currentTrack: mergedProps.playlist[mergedProps.currentTrackIndex] ?? null,
    setAudioRef: (audioRef: HTMLAudioElement | null) => {
      set({ audioRef })
      if (audioRef == null) return
      set({ volume: audioRef.volume * 100 })

      audioRef.addEventListener('durationchange', () =>
        set({ duration: audioRef.duration ?? 0 })
      )

      audioRef.addEventListener('timeupdate', () =>
        set({ currentTime: Math.floor(audioRef.currentTime) })
      )

      audioRef.addEventListener('ended', () => {
        const {
          shuffled,
          playlist,
          currentTrackIndex,
          repeatMode,
          setCurrentTrackIndex
        } = get()

        if (repeatMode === 'REPEAT_ONE') {
          setCurrentTrackIndex(currentTrackIndex)
          return
        }
        if (shuffled) {
          const nextTrack = Math.round(Math.random() * playlist.length)
          setCurrentTrackIndex(nextTrack)
          return
        }
        if (repeatMode === 'REPEAT_ALL') {
          const nextTrack =
            currentTrackIndex >= playlist.length - 1 ? 0 : currentTrackIndex + 1
          setCurrentTrackIndex(nextTrack)
        }
        if (currentTrackIndex < playlist.length - 1)
          setCurrentTrackIndex(currentTrackIndex + 1)
      })
    },
    setCurrentTrackIndex: (index: number) => {
      set({ currentTrackIndex: index, currentTime: 0 })
      const { audioRef, playlist, isPlaying } = get()
      set({ currentTrack: playlist[index] ?? null })
      if (audioRef == null) return
      audioRef.pause()
      audioRef.currentTime = 0
      audioRef.src = playlist[index].source
      if (isPlaying) audioRef.play()
    },
    setPlaylist: (playlist: Track[]) => set({ playlist }),
    setRepeatMode: (repeatMode: RepeatMode) => set({ repeatMode }),
    setShuffled: (shuffled: boolean) => set({ shuffled }),
    setVolume: (volume: number) => {
      const { audioRef } = get()
      set({ volume })
      if (audioRef != null) audioRef.volume = volume / 100
    },
    pause: () => {
      const { audioRef } = get()
      if (audioRef == null) return
      audioRef.pause()
      set({ isPlaying: false })
    },
    play: () => {
      const { audioRef } = get()
      if (audioRef == null) return
      audioRef.play()
      set({ isPlaying: true })
    },
    seek: (progress: number) => {
      const { audioRef } = get()
      if (audioRef == null) return
      audioRef.currentTime = progress
    },
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false })
  }))
}
