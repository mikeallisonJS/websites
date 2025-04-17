import Image from 'next/image'

import { cn } from '../utils/cn'

type CoverArtProps = {
  src?: string
  className?: string
}
export default function CoverArt({ src, className }: CoverArtProps) {
  return src != null ? (
    <Image
      src={src}
      alt={''}
      height={300}
      width={300}
      className={cn('border-divider overflow-hidden rounded', className)}
    />
  ) : (
    <div className="h-[42px] w-[42px] rounded bg-gray-300" />
  )
}
