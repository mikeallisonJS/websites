import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons/faStepBackward'
import { faStepForward } from '@fortawesome/free-solid-svg-icons/faStepForward'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@websites/shared/react/lib'

import { Button } from '../button'

import { Track } from './types'

type ControlsProps = {
  currentTrackIndex: number
  isPlaying: boolean
  isDrawerOpen: boolean
  onPause: () => void
  onPlay: () => void
  playlist: Track[]
  className?: string
  disabled?: boolean
  onChangeCurrentTrackIndex: (index: number) => void
}
export default function Controls({
  className,
  disabled = false,
  currentTrackIndex,
  isPlaying,
  isDrawerOpen,
  onPause,
  onPlay,
  playlist,
  onChangeCurrentTrackIndex
}: ControlsProps) {
  const onSkipNext = () => {
    const newTrackIndex =
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0
    onChangeCurrentTrackIndex(newTrackIndex)
  }
  const onSkipPrev = () => {
    const newTrackIndex =
      currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1
    onChangeCurrentTrackIndex(newTrackIndex)
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
        className={`${isDrawerOpen ? '' : 'hidden md:flex'}`}
        onClick={onSkipPrev}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faStepBackward} size="xl" />
      </Button>
      <Button
        variant="ghost"
        onClick={isPlaying ? onPause : onPlay}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xl" />
      </Button>
      <Button
        variant="ghost"
        onClick={onSkipNext}
        disabled={disabled}
        className={`${isDrawerOpen ? '' : 'hidden md:flex'}`}
      >
        <FontAwesomeIcon icon={faStepForward} size="xl" />
      </Button>
    </div>
  )
}
