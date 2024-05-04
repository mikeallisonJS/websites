import Link from 'next/link'

import { AuroraBackground } from '@websites/shared/react/components'

import { Hero } from '../components/hero'
import { Portfolio } from '../components/portfolio'
import { Services } from '../components/services'

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full mt-[-48px] pb-12 md:pb-12 lg:pb-16 xl:pb-24">
        <AuroraBackground className="h-[60vh]">
          <Hero />
        </AuroraBackground>
      </section>
      <section
        className="w-full pb-12 md:pb-24 lg:pb-32 justify-center flex"
        id="portfolio"
      >
        <Portfolio />
      </section>
      <section
        className="w-full pb-6 md:pb-12 lg:pb-16 pt-12 bg-gray-100 dark:bg-gray-800 justify-center flex"
        id="services"
      >
        <Services />
      </section>
      <section
        className="w-full pb-12 md:pb-24 lg:pb-32 pt-12 justify-center flex"
        id="contact"
      >
        <div className="container px-4 md:px-6 lg:px-16">
          <div className="items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className=" text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have a project in mind? Shoot me an email.
                </p>
                <p>
                  <Link
                    href="mailto:dj.mikeallison@gmail.com"
                    className="text-3xl hover:underline"
                  >
                    dj.mikeallison@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Mike Allison. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
