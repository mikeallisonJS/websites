'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Dialog, DialogContent, DialogTitle } from '@mikeallisonjs/ui/components/dialog'

type PastEventsProps = {
  images: string[]
}
export default function PastEvents({ images }: PastEventsProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  )

  const handleOpenChanged = () => {
    setSelectedImage(undefined)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[0, 1, 2].map((colIndex) => (
          <div className="grid gap-4" key={`column-${colIndex}`}>
            {images.map(
              (image, innerIndex) =>
                innerIndex % 3 === colIndex && (
                  <div
                    key={image}
                    className="text-center flex justify-center"
                    onClick={() => setSelectedImage(image)}
                    onKeyDown={() => setSelectedImage(image)}
                  >
                    <Image
                      width={300}
                      height={300}
                      className="h-auto max-w-full cursor-pointer rounded-lg"
                      src={`/images/flyers/${image}`}
                      alt={image}
                      priority={innerIndex < 3}
                    />
                  </div>
                )
            )}
          </div>
        ))}
      </div>
      <Dialog open={selectedImage != null} onOpenChange={handleOpenChanged}>
        <DialogContent className="z-50 min-h-[calc(100vh-140px)] min-w-[100vw]">
          <DialogTitle>Image</DialogTitle>
          {selectedImage && (
            <Image
              src={`/images/flyers/${selectedImage}`}
              alt="selected flyer"
              style={{ objectFit: 'contain' }}
              fill
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
