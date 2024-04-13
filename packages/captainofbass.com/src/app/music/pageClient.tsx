'use client'
import { ReactElement } from 'react'

import MusicList, { MusicType } from '../../components/musicList/musicList'

export default function MusicClient(): ReactElement {
  return (
    <>
      <MusicList type={MusicType.Originals} />
      <MusicList type={MusicType.Remixes} />
    </>
  )
}
