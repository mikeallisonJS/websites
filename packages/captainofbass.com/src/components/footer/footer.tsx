'use client'
import { ReactElement } from 'react'
import Player from 'react-material-music-player'
import { Track, PlayerInterface } from 'react-material-music-player'

export const songs: Track[] = [
  new Track(
    'uebok',
    '/images/cpt-border.png',
    'Uebok (Captain remix)',
    'Apashe',
    'https://www.mediafire.com/file/s4dz0s8v7yj73h5/Apashe_-_Uebok_%2528Captain_remix%2529.mp3/file'
  ),
  new Track(
    'xld',
    '/images/cpt-border.png',
    'XLD (Captain remix)',
    'Tyr Kohout',
    'https://www.mediafire.com/file/8iktnrnqwqd7guj/Tyr_Kohout_-_XLD_%2528Captain_Remix%2529.mp3/file'
  ),
  new Track(
    'drop-bass',
    '/images/cpt-border.png',
    'Drop Bass',
    'Captain',
    'http://www.mediafire.com/file/9ek7v4yq6z79dj4/Captain_-_Drop_Bass.mp3/file'
  ),
  new Track(
    'chaos',
    '/images/cpt-border.png',
    'Chaos',
    'Captain',
    'http://www.mediafire.com/file/newe5opi0mo1o9n/Captain_-_Chaos.mp3/file'
  ),
  new Track(
    'iam',
    '/images/cpt-border.png',
    'I am Captain',
    'Captain',
    'http://www.mediafire.com/file/gebeb3fgalazdlv/Captain_-_I_am_Captain.mp3/file'
  ),
  new Track(
    'saxaboom',
    '/images/cpt-border.png',
    'Saxaboom',
    'Captain',
    'http://www.mediafire.com/file/331keqy5bakihcv/Captain_-_Saxaboom.mp3/file'
  ),
  new Track(
    'thicc',
    '/images/cpt-border.png',
    'Thicc',
    'Captain',
    'http://www.mediafire.com/file/8wbtrhesygfvu59/Captain_-_Thicc.mp3/file'
  ),
  new Track(
    'mama',
    '/images/cpt-border.png',
    'Mama (feat Ellie Golding) (Captain DNB Remix)',
    'Clean Bandit',
    'http://www.mediafire.com/file/rhp3gc37kbcoruz/Clean_Bandit_-_Mama_%2528feat._Ellie_Goulding%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  ),
  new Track(
    'shake',
    '/images/cpt-border.png',
    'SHAKE feat Willdabeast (Captain DNB Remix)',
    'DEFUNK',
    'http://www.mediafire.com/file/wh49kj689svk6mb/DEFUNK_-_SHAKE_feat._Willdabeast_%2528Captain_DNB_Remix%2529.mp3/file'
  ),
  new Track(
    'contagious',
    '/images/cpt-border.png',
    'Contagious (Captain Breaks Remix)',
    'Haywyre',
    'http://www.mediafire.com/file/96wqioh7i28y3g4/Haywyre_-_Contagious_%2528Captain_Breaks_Remix%2529.mp3/file'
  ),
  new Track(
    'heavy',
    '/images/cpt-border.png',
    'Heavy (Captain DNB Remix)',
    'Sam Smyers',
    'http://www.mediafire.com/file/oj8fpuml2wcub1p/Sam_Smyers_-_Heavy_%2528Captain_D%2526B_Remix%2529.mp3/file'
  ),
  new Track(
    'never-let-you-go',
    '/images/cpt-border.png',
    'Never Let You Go (feat Sophia Reyes) (Captain DNB Remix)',
    'Slushii',
    'http://www.mediafire.com/file/cnu5rvnr1rv09b1/Slushii_-_Never_Let_You_Go_%2528feat._Sofia_Reyes%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  ),
  new Track(
    'top-shelf',
    '/images/cpt-border.png',
    'Top Shelf (feat Bipolar Sunshine) (Captain DNB Remix)',
    'Whethan',
    'http://www.mediafire.com/file/0o4tf9hrmje0od9/Whethan_-_Top_Shelf_%2528feat._Bipolar_Sunshine%2529_%2528Captain_D%2526B_Remix%2529.mp3/file'
  ),
  new Track(
    'never-let-you-go-extended',
    '/images/cpt-border.png',
    'Never Let You Go (feat Sophia Reyes) (Extended Captain DNB Remix)',
    'Slushii',
    'http://www.mediafire.com/file/cnu5rvnr1rv09b1/Slushii_-_Never_Let_You_Go_%2528feat._Sofia_Reyes%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  )
]

export default function Footer(): ReactElement {
  PlayerInterface.setPlaylist(songs)
  return <Player />
}
