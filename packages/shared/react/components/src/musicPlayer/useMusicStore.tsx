'use client'

import { create } from 'zustand'
import { RepeatMode, Track } from './types'

interface MusicStore {
  audioRef: HTMLAudioElement | null
  currentTrack: number
  currentTime: number
  duration: number
  isPlaying: boolean
  playlist: Track[]
  repeatMode: RepeatMode
  shuffled: boolean
  volume: number
  setCurrentTime: (currentTime: number) => void
  setCurrentTrack: (currentTrack: number) => void
  setDuration: (duration: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setPlaylist: (playlist: Track[]) => void
  setRepeatMode: (repeatMode: RepeatMode) => void
  setShuffled: (shuffled: boolean) => void
  setVolume: (volume: number) => void
}

export const useMusicStore = create<MusicStore>((set) => ({
  audioRef: null,
  currentTime: 0,
  currentTrack: 0,
  duration: 0,
  isPlaying: false,
  playlist: [],
  repeatMode: RepeatMode.NORMAL,
  shuffled: false,
  volume: 100,
  setAudioRef: (audioRef: HTMLAudioElement) => set({ audioRef }),
  setCurrentTime: (currentTime: number) => set({ currentTime }),
  setCurrentTrack: (currentTrack: number) => set({ currentTrack }),
  setDuration: (duration: number) => set({ duration }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setPlaylist: (playlist: Track[]) => set({ playlist }),
  setRepeatMode: (repeatMode: RepeatMode) => set({ repeatMode }),
  setShuffled: (shuffled: boolean) => set({ shuffled }),
  setVolume: (volume: number) => set({ volume })
}))
