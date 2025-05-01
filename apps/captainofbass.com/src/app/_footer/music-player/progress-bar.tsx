import { Slider } from '@mikeallisonjs/ui/components/slider'
import { cn } from '@mikeallisonjs/ui/lib/utils'
import { useEffect, useState } from 'react'

function secondsToString(seconds: number) {
  // Handle invalid values
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60).toString()
  const mseconds = Math.floor(seconds % 60).toString()

  return `${minutes}:${mseconds.length < 2 ? '0' : ''}${mseconds}`
}

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
  const [value, setValue] = useState(currentTime)
  const [isSeeking, setIsSeeking] = useState(false)

  // Ensure we have valid numbers to work with
  const validDuration =
    !isNaN(duration) && isFinite(duration) && duration > 0 ? duration : 100
  const validCurrentTime =
    !isNaN(currentTime) && isFinite(currentTime) && currentTime >= 0
      ? currentTime
      : 0

  // Update local value from props only if we're not actively seeking
  useEffect(() => {
    if (!isSeeking) {
      setValue(validCurrentTime)
    }
  }, [validCurrentTime, isSeeking])

  const handleValueChange = (newValue: number[]) => {
    const newPosition = newValue[0] ?? 0
    setIsSeeking(true)
    setValue(newPosition)
  }

  const handleValueCommit = (newValue: number[]) => {
    const newPosition = newValue[0] ?? 0
    setIsSeeking(false)
    onSeek(newPosition)
  }

  return (
    <div className={cn('flex flex-row flex-nowrap items-center', className)}>
      <div className="mx-1">{secondsToString(validCurrentTime)}</div>
      <Slider
        className="mx-1"
        aria-labelledby="continuous-slider"
        value={[value]}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        max={validDuration}
        min={0}
        step={1}
      />
      <div className="mx-1">
        {secondsToString(Math.max(0, validDuration - validCurrentTime))}
      </div>
    </div>
  )
}
