import secondsToString from './secondsToString'
import { Slider } from '../slider'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@websites/shared/react/lib'
import { useMusicPlayerContext } from './context'

type ProgressBarProps = {
  className?: string
}
export default function ProgressBar({ className }: ProgressBarProps) {
  const { duration, currentTime, seek } = useMusicPlayerContext((s) => s)

  const handleSliderChange = (newValue: number[]) => {
    seek(newValue[0])
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
