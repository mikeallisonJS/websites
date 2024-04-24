'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Dialog, DialogContent } from './dialog'

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((colIndex) => (
          <div className="grid gap-4" key={`column-${colIndex}`}>
            {images.map(
              (image, innerIndex) =>
                innerIndex % 3 === colIndex && (
                  <div
                    key={image}
                    className='flex justify-center text-center"'
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      width={300}
                      height={300}
                      className="h-auto max-w-full rounded-lg cursor-pointer"
                      src={`/images/flyers/${image}`}
                      alt={image}
                    />
                  </div>
                )
            )}
          </div>
        ))}
      </div>
      <Dialog open={selectedImage != null} onOpenChange={handleOpenChanged}>
        <DialogContent className="min-w-[100vw] min-h-[calc(100vh-140px)] z-50">
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
