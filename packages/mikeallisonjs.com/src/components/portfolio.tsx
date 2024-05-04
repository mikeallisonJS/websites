import {
  IconBrandAlgolia,
  IconBrandAngular,
  IconBrandAws,
  IconBrandGoogle,
  IconBrandGraphql,
  IconBrandGumroad,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTerraform,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandWordpress,
  IconCoffee,
  IconDiamond
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import {
  BentoGrid,
  BentoGridItem,
  Button
} from '@websites/shared/react/components'

const Overlay = ({
  children,
  websiteUrl,
  githubUrl
}: {
  children: ReactNode
  websiteUrl: string
  githubUrl?: string
}) => (
  <div className="relative">
    {children}
    <div className="top-0 bottom-0 m-4 flex flex-col justify-center gap-4 items-center w-[100%] lg:w-[16rem] md:w-[12.5rem] sm:w-[36rem]  h-[14.1rem] min-h-[8rem] rounded-xl opacity-0 hover:opacity-100 hover:bg-background/30 backdrop-blur z-10 absolute">
      <Link href={websiteUrl} target="_blank">
        <Button>website</Button>
      </Link>
      {githubUrl && (
        <Link href={githubUrl} target="_blank">
          <Button>github</Button>
        </Link>
      )}
    </div>
  </div>
)

export function Portfolio() {
  return (
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Portfolio
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Some of the professional and personal projects I&lsquo;ve worked on
          over the years.
        </p>
      </div>
      <BentoGrid className="max-w-4xl mx-auto">
        <Overlay
          websiteUrl="https://nextsteps.is/"
          githubUrl="https://github.com/JesusFilm/core"
        >
          <BentoGridItem
            title="NextSteps"
            description="A Next.js site connecting visitors to Jesusfilm content through engaging visual journeys on their journey of faith."
            header={
              <Image
                src="/images/nextsteps.jpeg"
                alt="nextsteps"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandNextjs />
                <IconBrandNodejs />
                <IconBrandGraphql />
                <IconBrandTypescript />
                <IconBrandVercel />
                <IconBrandTerraform />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay
          websiteUrl="https://admin.nextsteps.is/"
          githubUrl="https://github.com/JesusFilm/core"
        >
          <BentoGridItem
            title="NextSteps Admin"
            description="A Next.js site empowering content managers to create new and exciting journeys for visitors."
            header={
              <Image
                src="/images/nextsteps-admin.jpeg"
                alt="nextsteps-admin"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandNextjs />
                <IconBrandNodejs />
                <IconBrandGraphql />
                <IconBrandTypescript />
                <IconBrandAws />
                <IconBrandTerraform />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay
          websiteUrl="https://jesusfilm.org/watch"
          githubUrl="https://github.com/JesusFilm/core"
        >
          <BentoGridItem
            title="Jesusfilm watch"
            description="A Next.js site showcasing Jesusfilm videos in an easy to use, AI searchable content library."
            header={
              <Image
                src="/images/jfm-watch.png"
                alt="jesusfilm"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandNextjs />
                <IconBrandNodejs />
                <IconBrandGraphql />
                <IconBrandTypescript />
                <IconBrandVercel />
                <IconBrandAlgolia />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay websiteUrl="https://captainssounds.com">
          <BentoGridItem
            title="Captain's Sounds"
            description="A Next.js eCommerce site for music production"
            header={
              <Image
                src="/images/captainssounds.jpeg"
                alt="captainssounds"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandNextjs />
                <IconBrandGraphql />
                <IconBrandTypescript />
                <IconBrandVercel />
                <IconBrandGumroad />
                <IconBrandGoogle />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay websiteUrl="https://captainofbass.com">
          <BentoGridItem
            title="captainofbass.com"
            description="A Next.js site for music artist Captain (my music project)"
            header={
              <Image
                src="/images/captainofbass.png"
                alt="captainofbass"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandNextjs />
                <IconBrandTypescript />
                <IconBrandVercel />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay websiteUrl="https://pbmtv.org">
          <BentoGridItem
            title="PBMTV"
            description="Public Broadcasting Music Television is a non-profit broadcast network."
            header={
              <Image
                src="/images/pbmtv.png"
                alt="PBMTV"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandReact />
                <IconBrandNodejs />
                <IconBrandWordpress />
              </div>
            }
            className="md:h-[390px]"
          />
        </Overlay>
        <Overlay
          websiteUrl="https://mpdx.org"
          githubUrl="https://github.com/CruGlobal/mpdx-react"
        >
          <BentoGridItem
            title="MPDX"
            description="An open-source solution for fundraising and donor management."
            header={
              <Image
                src="/images/mpdx.png"
                alt="MPDX"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandAngular />
                <IconDiamond />
              </div>
            }
          />
        </Overlay>
        <Overlay websiteUrl="https://edgenuity.com">
          <BentoGridItem
            title="Compass Learning"
            description="Nationwide online learning platforms for K-12 students."
            header={
              <Image
                src="/images/compass.png"
                alt="compass"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandAngular />
              </div>
            }
          />
        </Overlay>
        <Overlay websiteUrl="https://agilix.com">
          <BentoGridItem
            title="Agilix"
            description="Online learning platform powering countless learning and test taking solutions."
            header={
              <Image
                src="/images/agilix.png"
                alt="agilix"
                width={400}
                height={200}
                className="rounded-xl"
                style={{
                  width: '100%',
                  height: '14rem',
                  objectFit: 'cover'
                }}
              />
            }
            icon={
              <div className="flex gap-2">
                <IconBrandAngular />
                <IconBrandNodejs />
                <IconCoffee />
              </div>
            }
          />
        </Overlay>
      </BentoGrid>
    </div>
  )
}
