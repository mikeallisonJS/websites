import Link from 'next/link'

import { AuroraBackground } from '@websites/shared/react/components'

import { Hero } from '../components/hero'
import { Portfolio } from '../components/portfolio'

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
        <div className="container px-4 md:px-6 lg:px-16">
          <div className="items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100  py-1 text-sm dark:bg-gray-800">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tailored Solutions for Your Business
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Providing custom web development, enterprise infrastructure
                  design, scalable live video streaming service,
                  organization-wide monorepos and anything between.
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Web Development
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Holistic Enterprise Architecture Design
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-500 dark:text-gray-400">
                    Scalable Start Up Solutions
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-500 dark:text-gray-400">
                    E-commerce Solutions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
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

function CheckIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
