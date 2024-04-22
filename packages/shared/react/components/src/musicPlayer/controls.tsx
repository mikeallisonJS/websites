import { faStepBackward } from '@fortawesome/free-solid-svg-icons/faStepBackward'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useMusicStore } from './useMusicStore'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@websites/shared/react/lib'
import { Button } from '../button'

type ControlsProps = {
  className?: string
  disabled?: boolean
  onChangeTrack: (value: number) => void
  onPlay: () => void
}
export default function Controls({
  className,
  disabled = false,
  onChangeTrack,
  onPlay
}: ControlsProps) {
  const { currentTrack, isPlaying, playlist } = useMusicStore(
    useShallow((state) => state)
  )

  const onSkipNext = () => {
    const newTrackIndex =
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    onChangeTrack(newTrackIndex)
  }
  const onSkipPrev = () => {
    const newTrackIndex =
      currentTrack > 0 ? currentTrack - 1 : playlist.length - 1
    onChangeTrack(newTrackIndex)
  }

  return (
    <div
      className={cn(
        'flex flex-row items-center flex-nowrap justify-center',
        className
      )}
    >
      <Button
        variant="ghost"
        className="hidden md:flex"
        onClick={onSkipPrev}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faStepBackward} size="xl" />
      </Button>
      <Button variant="ghost" onClick={onPlay} disabled={disabled}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xl" />
      </Button>
      <Button variant="ghost" onClick={onSkipNext} disabled={disabled}>
        <FontAwesomeIcon icon={faStepForward} size="xl" />
      </Button>
    </div>
  )
}
