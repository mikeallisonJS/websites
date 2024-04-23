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
    <div className={className}>
      <div className="text-sm text-nowrap overflow-hidden">{title}</div>
      <div className="text-xs text-nowrap overflow-hidden">{artist}</div>
    </div>
  )
}
