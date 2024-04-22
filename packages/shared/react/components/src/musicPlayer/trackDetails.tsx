import { useMusicStore } from './useMusicStore'

type TrackDetailsProps = {
  className?: string
}

export default function TrackDetails({ className }: TrackDetailsProps) {
  const { playlist, currentTrack } = useMusicStore((state) => state)

  return (
    <div className={className}>
      <div className="text-sm text-nowrap overflow-hidden">
        {playlist[currentTrack]?.title ?? ''}
      </div>
      <div className="text-xs text-nowrap overflow-hidden">
        {playlist[currentTrack]?.artist ?? ''}
      </div>
    </div>
  )
}
