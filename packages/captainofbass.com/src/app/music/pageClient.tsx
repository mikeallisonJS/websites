'use client'

import MusicList, { MusicType } from '../../components/musicList/musicList'

export default function MusicClient() {
  return (
    <>
      <MusicList type={MusicType.Originals} />
      <div className="h-4" />
      <MusicList type={MusicType.Remixes} />
    </>
  )
}
