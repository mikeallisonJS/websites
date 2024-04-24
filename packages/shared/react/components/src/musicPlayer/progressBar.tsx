import secondsToString from './secondsToString'
import { Slider } from '../slider'
import { cn } from '@websites/shared/react/lib'

type ProgressBarProps = {
  duration: number
  currentTime: number
  onSeek: (time: number) => void
  className?: string
}
export default function ProgressBar({
  className,
  duration,
  currentTime,
  onSeek
}: ProgressBarProps) {
  const handleSliderChange = (newValue: number[]) => {
    onSeek(newValue[0])
  }

  return (
    <div className={cn('flex flex-row flex-nowrap items-center', className)}>
      <div className="mx-1">{secondsToString(currentTime)}</div>
      <Slider
        className="mx-1"
        aria-labelledby="continuous-slider"
        defaultValue={[currentTime]}
        onValueCommit={handleSliderChange}
        max={duration ?? 1}
      />
      <div className="mx-1">{secondsToString(duration - currentTime)}</div>
    </div>
  )
}
