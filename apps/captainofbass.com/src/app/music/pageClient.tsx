'use client'

import { MusicPlayerProvider } from '@mikeallisonjs/shared-react-components'

import { songs } from '../_footer/footer'
import MusicList, { MusicType } from './_musicList/musicList'

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
