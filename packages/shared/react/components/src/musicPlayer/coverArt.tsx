import { cn } from '@websites/shared/react/lib'
import Image from 'next/image'

type CoverArtProps = {
  src: string
  className?: string
}
export default function CoverArt({ src, className }: CoverArtProps) {
  return (
    <Image
      src={src}
      alt={''}
      height={48}
      width={48}
      className={cn('border-divider rounded overflow-hidden', className)}
    />
  )
}
