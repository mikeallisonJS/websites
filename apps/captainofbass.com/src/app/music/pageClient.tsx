'use client'

import MusicList, { MusicType } from './_musicList/musicList'

import { songs } from '@/app/_footer/footer'
import { MusicPlayerProvider } from '@/app/_footer/music-player'

export default function MusicClient() {
  return (
    <>
      <MusicPlayerProvider playlist={songs}>
        <MusicList type={MusicType.Originals} />
        <div className="h-4" />
        <MusicList type={MusicType.Remixes} />
      </MusicPlayerProvider>
    </>
  )
}
