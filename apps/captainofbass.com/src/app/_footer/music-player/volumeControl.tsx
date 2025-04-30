import { faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mikeallisonjs/ui/components/button'
import { Slider } from '@mikeallisonjs/ui/components/slider'
import { cn } from '@mikeallisonjs/ui/lib/utils'

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
    onVolumeChange(newValue[0] ?? 0)
  }

  return (
    <div className={cn('flex flex-row items-center text-nowrap', className)}>
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
