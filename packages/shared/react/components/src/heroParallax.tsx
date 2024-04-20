'use client'

import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type Product = {
  title: string
  link: string
  thumbnail: string
}

export const HeroParallax = ({
  children,
  products,
  itemsPerRow = 5
}: {
  children: React.ReactNode
  itemsPerRow?: number
  products: Product[]
}) => {
  const rowCount = Math.ceil(products.length / itemsPerRow)
  const productRows: Array<Array<Product>> = []
  for (let i = 0; i < rowCount; i++) {
    productRows.push([
      products[(i + 1) * itemsPerRow],
      ...products.slice(i * itemsPerRow, (i + 1) * itemsPerRow),
      products[i * itemsPerRow]
    ])
  }
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  )
  return (
    <div
      ref={ref}
      className={`h-[${(rowCount + 1) * 100}vh] pt-16 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]`}
    >
      {children}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity
        }}
        className=""
      >
        {productRows.map((row, i) =>
          i % 2 === 1 ? (
            <motion.div
              className={`flex flex-row-reverse space-x-reverse space-x-20 mb-20`}
            >
              {row.map(
                (product) =>
                  product != null && (
                    <ProductCard
                      product={product}
                      translate={translateX}
                      key={product.title}
                    />
                  )
              )}
            </motion.div>
          ) : (
            <motion.div className={`flex flex-row  mb-20 space-x-20`}>
              {row.map(
                (product) =>
                  product != null && (
                    <ProductCard
                      product={product}
                      translate={translateXReverse}
                      key={product.title}
                    />
                  )
              )}
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate
      }}
      whileHover={{
        y: -20
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  )
}
