import withoutPropagation from './utils/withoutPropagation'
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slider } from '../slider'
import { useMusicStore } from './useMusicStore'
import { cn } from '@websites/shared/react/lib'
import { Button } from '../button'
import { RefObject, useEffect } from 'react'

type VolumeControlProps = {
  audioRef: RefObject<HTMLAudioElement>
  className?: string
}
export default function VolumeControl({
  className,
  audioRef
}: VolumeControlProps) {
  const { volume, setVolume } = useMusicStore((state) => state)

  useEffect(() => {
    if (audioRef.current != null) setVolume(audioRef.current.volume * 100)
  }, [audioRef])

  const onVolumeChange = (value: number) => {
    if (audioRef.current != null) audioRef.current.volume = value / 100
    setVolume(value)
  }

  const handleSliderChange = (newValue: number[]) => {
    onVolumeChange(newValue[0])
  }

  return (
    <div className={cn('flex flex-row text-nowrap items-center', className)}>
      <Button
        variant="ghost"
        onClick={withoutPropagation(
          onVolumeChange,
          volume < 10 ? 0 : volume - 10
        )}
      >
        <FontAwesomeIcon icon={faVolumeDown} size="xl" />
      </Button>
      <Slider
        className="mx-1"
        defaultValue={[volume]}
        aria-labelledby="continuous-slider"
        onValueCommit={handleSliderChange}
      />
      <Button
        variant="ghost"
        onClick={withoutPropagation(
          onVolumeChange,
          volume > 90 ? 100 : volume + 10
        )}
      >
        <FontAwesomeIcon icon={faVolumeUp} size="xl" />
      </Button>
    </div>
  )
}
