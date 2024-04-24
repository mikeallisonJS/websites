import { faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '@websites/shared/react/lib'

import { Button } from '../button'
import { Slider } from '../slider'

type VolumeControlProps = {
  volume: number
  className?: string
  onVolumeChange: (volume: number) => void
}
export default function VolumeControl({
  className,
  volume,
  onVolumeChange
}: VolumeControlProps) {
  const handleSliderChange = (newValue: number[]) => {
    onVolumeChange(newValue[0])
  }

  return (
    <div className={cn('flex flex-row text-nowrap items-center', className)}>
      <Button
        variant="ghost"
        onClick={() => onVolumeChange(volume < 10 ? 0 : volume - 10)}
      >
        <FontAwesomeIcon icon={faVolumeDown} size="xl" />
      </Button>
      <Slider
        className="mx-1"
        defaultValue={[volume]}
        aria-labelledby="continuous-slider"
        onValueChange={handleSliderChange}
      />
      <Button
        variant="ghost"
        onClick={() => onVolumeChange(volume > 90 ? 100 : volume + 10)}
      >
        <FontAwesomeIcon icon={faVolumeUp} size="xl" />
      </Button>
    </div>
  )
}
