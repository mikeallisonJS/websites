'use client'

export interface Track {
  ID: string
  coverArt: string
  title: string
  artist: string
  source: string
}

export enum RepeatMode {
  NORMAL = 'NORMAL',
  REPEAT_ALL = 'REPEAT_ALL',
  REPEAT_ONE = 'REPEAT_ONE'
}
