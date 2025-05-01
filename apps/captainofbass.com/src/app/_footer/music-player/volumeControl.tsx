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
  // Ensure volume is a valid number between 0-100
  const validVolume =
    !isNaN(volume) && isFinite(volume)
      ? Math.min(100, Math.max(0, volume))
      : 100

  const handleSliderChange = (newValue: number[]) => {
    const newVolume = newValue[0] ?? 0
    onVolumeChange(newVolume)
  }

  return (
    <div className={cn('flex flex-row items-center text-nowrap', className)}>
      <Button
        variant="ghost"
        onClick={() => onVolumeChange(validVolume < 10 ? 0 : validVolume - 10)}
      >
        <FontAwesomeIcon icon={faVolumeDown} size="xl" />
      </Button>
      <Slider
        className="mx-1"
        value={[validVolume]}
        min={0}
        max={100}
        step={1}
        aria-labelledby="continuous-slider"
        onValueChange={handleSliderChange}
      />
      <Button
        variant="ghost"
        onClick={() =>
          onVolumeChange(validVolume > 90 ? 100 : validVolume + 10)
        }
      >
        <FontAwesomeIcon icon={faVolumeUp} size="xl" />
      </Button>
    </div>
  )
}
