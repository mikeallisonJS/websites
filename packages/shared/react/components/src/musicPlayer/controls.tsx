import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons/faStepBackward'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@websites/shared/react/lib'

import { Button } from '../button'

import { useMusicPlayerContext } from './context'

type ControlsProps = {
  className?: string
  disabled?: boolean
}
export default function Controls({
  className,
  disabled = false
}: ControlsProps) {
  const {
    currentTrackIndex,
    isPlaying,
    isPlaylistOpen,
    pause,
    play,
    playlist,
    setCurrentTrackIndex
  } = useMusicPlayerContext((s) => s)

  const onSkipNext = () => {
    const newTrackIndex =
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0
    setCurrentTrackIndex(newTrackIndex)
  }
  const onSkipPrev = () => {
    const newTrackIndex =
      currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1
    setCurrentTrackIndex(newTrackIndex)
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
        className={`${isPlaylistOpen ? '' : 'hidden md:flex'}`}
        onClick={onSkipPrev}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faStepBackward} size="xl" />
      </Button>
      <Button
        variant="ghost"
        onClick={isPlaying ? pause : play}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xl" />
      </Button>
      <Button
        variant="ghost"
        onClick={onSkipNext}
        disabled={disabled}
        className={`${isPlaylistOpen ? '' : 'hidden md:flex'}`}
      >
        <FontAwesomeIcon icon={faStepForward} size="xl" />
      </Button>
    </div>
  )
}
