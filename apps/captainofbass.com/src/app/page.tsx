import { PastEvents } from '@mikeallisonjs/shared-react-components'
import Image from 'next/image'

import Bio from '../components/bio/bio'
import { YouTubeVideo } from '../components/youtubeVideo'

const images = [
  'dystopia-24-3.jpg',
  'sltdnb-24-1.png',
  'sltdnb-23-12.png',
  'dnbal-23-10.jpeg',
  'sltdnb-23-9.png',
  'sltdnb-23-7.png',
  'sltdnb-23-5.png',
  'dnbal-23-4.jpeg',
  'uv-23-2.png',
  'uv-23-1.png',
  'uv-22-12.png',
  'dnbatthelake2.jpeg',
  'dnbatthelake.jpeg',
  'uv-22-5.png',
  'eventhorizon.jpeg',
  'uv-22-2.png',
  'uv-21-12.png',
  'welcomehome.png',
  'skrillex.jpg',
  'tittsworth.jpg',
  'potd.JPG',
  'redbull.jpg',
  'mrk1.jpg',
  'skynet.jpg',
  'phace.JPG',
  'potd2.JPG',
  'vaski.jpg',
  'ufo.JPG',
  'teebee.jpg',
  'yes.jpg',
  'mwff.JPG',
  'hybrid.JPG',
  'yes2.JPG',
  'nightrain.JPG',
  'bassic.JPG',
  'delano.JPG',
  'unify.jpg',
  'wildthings.JPG',
  'pj.jpg',
  'pleasure.jpg',
  'food10.jpg',
  'move.jpg',
  'dfuse.jpg',
  'tps.jpg'
]

export default function Index() {
  return (
    <div className="mx-[5vw]">
      <div className="mt-0 mb-16 flex w-[90vw] flex-col justify-center gap-8">
        <div
          className="flex w-full flex-col items-center justify-center"
          style={{ height: '100vh' }}
        >
          <div className="w-full mb-6">
            <YouTubeVideo videoId="3YIr_vl4Hlc" />
          </div>
          <div className="flex w-[100%] justify-center -mt-[15px]">
            <Image
              src="/images/cpt-border.png"
              alt="logo"
              width={617}
              height={181}
              priority
              style={{
                maxWidth: '90vw',
                height: '18vh'
              }}
            />
          </div>
        </div>
        <Bio />
        <PastEvents images={images} />
      </div>
    </div>
  )
}
