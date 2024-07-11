import Link from 'next/link'

import { AuroraBackground } from '@mikeallisonjs/shared-react-components'

import { Hero } from '../components/hero'
import { Portfolio } from '../components/portfolio'
import { Services } from '../components/services'

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="mt-[-48px] w-full pb-12 md:pb-12 lg:pb-16 xl:pb-24">
        <AuroraBackground className="h-[60vh]">
          <Hero />
        </AuroraBackground>
      </section>
      <section
        className="flex w-full justify-center pb-12 md:pb-24 lg:pb-32"
        id="portfolio"
      >
        <Portfolio />
      </section>
      <section
        className="flex w-full justify-center bg-gray-100 pb-6 pt-12 md:pb-12 lg:pb-16 dark:bg-gray-800"
        id="services"
      >
        <Services />
      </section>
      <section
        className="flex w-full justify-center pb-12 pt-12 md:pb-24 lg:pb-32"
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
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Mike Allison. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
