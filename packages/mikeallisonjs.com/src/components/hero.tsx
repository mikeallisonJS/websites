'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut'
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-9xl/none">
              <span className="text-primary">mikeallison</span>
              <span className="text-secondary">JS</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Over {new Date().getFullYear() - 2000} years experience designing
              cutting edge software solutions for global industry leading
              businesses.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
