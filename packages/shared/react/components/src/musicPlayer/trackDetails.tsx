import { cn } from '@websites/shared/react/lib'

type TrackDetailsProps = {
  title: string
  artist: string
  className?: string
}

export default function TrackDetails({
  title,
  artist,
  className
}: TrackDetailsProps) {
  return (
    <div className={cn('sm:cursor-pointer', className)}>
      <div className="overflow-hidden text-nowrap text-sm">{title}</div>
      <div className="overflow-hidden text-nowrap text-xs">{artist}</div>
    </div>
  )
}
