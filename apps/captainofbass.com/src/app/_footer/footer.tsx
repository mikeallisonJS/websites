'use client'

import {
  MusicPlayerProvider,
  Player,
  type Track
} from '@mikeallisonjs/shared-react-components'

export const songs: Track[] = [
  {
    ID: 'uebok-2024',
    coverArt: '/images/albums/uebok.png',
    title: 'Uebok (Captain extended 2024 remix)',
    artist: 'Apashe',
    source:
      'https://www.mediafire.com/file_premium/piwjyso0y28m92j/Apashe_-_Uebok_%2528Captain_remix%2529_3%2528extended%2529.mp3/file'
  },
  {
    ID: 'bangharder',
    coverArt: '/images/albums/Lost_Trips_Final.V2_512.jpg',
    title: 'Bang Harder',
    artist: 'Blunter S. Whompson, Captain, Sqwurl',
    source:
      'https://www.mediafire.com/file_premium/ns8d5jlzokc8plk/Captain_x_Sqwurl_x_Blunter_s._Whompson_-_Bang_Harder_%2528Original_Mix%2529.mp3/file'
  },
  {
    ID: 'uebok',
    coverArt: '/images/albums/uebok.png',
    title: 'Uebok (Captain remix)',
    artist: 'Apashe',
    source:
      'https://www.mediafire.com/file/s4dz0s8v7yj73h5/Apashe_-_Uebok_%2528Captain_remix%2529.mp3/file'
  },
  {
    ID: 'xld',
    coverArt: '/images/albums/xld.jpg',
    title: 'XLD (Captain remix)',
    artist: 'Tyr Kohout',
    source:
      'https://www.mediafire.com/file/8iktnrnqwqd7guj/Tyr_Kohout_-_XLD_%2528Captain_Remix%2529.mp3/file'
  },
  {
    ID: 'drop-bass',
    coverArt: '/images/albums/drop-bass.png',
    title: 'Drop Bass',
    artist: 'Captain',
    source:
      'http://www.mediafire.com/file/9ek7v4yq6z79dj4/Captain_-_Drop_Bass.mp3/file'
  },
  {
    ID: 'chaos',
    coverArt: '/images/albums/chaos.jpg',
    title: 'Chaos',
    artist: 'Captain',
    source:
      'http://www.mediafire.com/file/newe5opi0mo1o9n/Captain_-_Chaos.mp3/file'
  },
  {
    ID: 'iam',
    coverArt: '/images/albums/iamcaptain.png',
    title: 'I am Captain',
    artist: 'Captain',
    source:
      'http://www.mediafire.com/file/gebeb3fgalazdlv/Captain_-_I_am_Captain.mp3/file'
  },
  {
    ID: 'saxaboom',
    coverArt: '/images/albums/saxaboom.png',
    title: 'Saxaboom',
    artist: 'Captain',
    source:
      'http://www.mediafire.com/file/331keqy5bakihcv/Captain_-_Saxaboom.mp3/file'
  },
  {
    ID: 'thicc',
    coverArt: '/images/albums/thicc.png',
    title: 'Thicc',
    artist: 'Captain',
    source:
      'http://www.mediafire.com/file/8wbtrhesygfvu59/Captain_-_Thicc.mp3/file'
  },
  {
    ID: 'mama',
    coverArt: '/images/albums/mama.jpg',
    title: 'Mama (feat Ellie Golding) (Captain DNB Remix)',
    artist: 'Clean Bandit',
    source:
      'http://www.mediafire.com/file/rhp3gc37kbcoruz/Clean_Bandit_-_Mama_%2528feat._Ellie_Goulding%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  },
  {
    ID: 'shake',
    coverArt: '/images/albums/shake.png',
    title: 'SHAKE feat Willdabeast (Captain DNB Remix)',
    artist: 'DEFUNK',
    source:
      'http://www.mediafire.com/file/wh49kj689svk6mb/DEFUNK_-_SHAKE_feat._Willdabeast_%2528Captain_DNB_Remix%2529.mp3/file'
  },
  {
    ID: 'contagious',
    coverArt: '/images/albums/contagious.jpg',
    title: 'Contagious (Captain Breaks Remix)',
    artist: 'Haywyre',
    source:
      'http://www.mediafire.com/file/96wqioh7i28y3g4/Haywyre_-_Contagious_%2528Captain_Breaks_Remix%2529.mp3/file'
  },
  {
    ID: 'heavy',
    coverArt: '/images/albums/heavy.jpg',
    title: 'Heavy (Captain DNB Remix)',
    artist: 'Sam Smyers',
    source:
      'http://www.mediafire.com/file/oj8fpuml2wcub1p/Sam_Smyers_-_Heavy_%2528Captain_D%2526B_Remix%2529.mp3/file'
  },
  {
    ID: 'never-let-you-go',
    coverArt: '/images/albums/neverletyougo.jpg',
    title: 'Never Let You Go (feat Sophia Reyes) (Captain DNB Remix)',
    artist: 'Slushii',
    source:
      'http://www.mediafire.com/file/cnu5rvnr1rv09b1/Slushii_-_Never_Let_You_Go_%2528feat._Sofia_Reyes%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  },
  {
    ID: 'top-shelf',
    coverArt: '/images/albums/top-shelf.jpg',
    title: 'Top Shelf (feat Bipolar Sunshine) (Captain DNB Remix)',
    artist: 'Whethan',
    source:
      'http://www.mediafire.com/file/0o4tf9hrmje0od9/Whethan_-_Top_Shelf_%2528feat._Bipolar_Sunshine%2529_%2528Captain_D%2526B_Remix%2529.mp3/file'
  },
  {
    ID: 'never-let-you-go-extended',
    coverArt: '/images/albums/neverletyougo.jpg',
    title: 'Never Let You Go (feat Sophia Reyes) (Extended Captain DNB Remix)',
    artist: 'Slushii',
    source:
      'http://www.mediafire.com/file/cnu5rvnr1rv09b1/Slushii_-_Never_Let_You_Go_%2528feat._Sofia_Reyes%2529_%2528Captain_DNB_Remix%2529.mp3/file'
  }
]

export default function Footer() {
  return (
    <MusicPlayerProvider playlist={songs}>
      <Player className="bg-background/20 supports-[backdrop-filter]:bg-background/30 backdrop-blur" />
    </MusicPlayerProvider>
  )
}
