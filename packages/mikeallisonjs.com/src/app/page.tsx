/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AHnVNT7P0AH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { IconBrandNextjs } from '@tabler/icons-react'
import Link from 'next/link'

import {
  AuroraBackground,
  BentoGrid,
  BentoGridItem,
  Button,
  Input,
  Label,
  Textarea
} from '@websites/shared/react/components'

import { Hero } from '../components/hero'

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
)

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full mt-[-48px] pb-12 md:pb-12 lg:pb-16 xl:pb-24">
        <AuroraBackground className="h-[60vh]">
          <Hero />
        </AuroraBackground>
      </section>
      <section className="w-full pb-12 md:py-24 lg:py-32" id="portfolio">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Portfolio
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out some of the innovative web and mobile solutions we've
              crafted for our clients.
            </p>
          </div>
          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="NextSteps"
              description=""
              header={<Skeleton />}
              icon={<IconBrandNextjs />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Our Services
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tailored Solutions for Your Business
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  From custom web development to mobile app design, our team of
                  experts delivers innovative solutions to help your business
                  thrive in the digital landscape.
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
                    Mobile App Development
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
                  <span className="text-gray-500 dark:text-gray-400">
                    UI/UX Design
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
            <img
              alt="Services"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Have a project in mind? Fill out the form below and our team will
              get back to you as soon as possible.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex flex-col space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  required
                  rows={4}
                />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Developers. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CheckIcon(props) {
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
