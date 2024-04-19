'use client'

import MusicList, { MusicType } from '../../components/musicList/musicList'

export default function MusicClient() {
  return (
    <>
      <MusicList type={MusicType.Originals} />
      <MusicList type={MusicType.Remixes} />
    </>
  )
}
