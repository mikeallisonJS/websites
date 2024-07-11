import { useEffect, useState } from 'react'

import { cn } from 'packages/shared-react-lib/src'

import { Slider } from '../slider'

function secondsToString(seconds: number) {
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

  useEffect(() => {
    if (!isSeeking) setValue(currentTime)
  }, [currentTime, isSeeking])

  const handleValueChange = (newValue: number[]) => {
    setIsSeeking(true)
    setValue(newValue[0])
  }

  const handleSliderChange = (newValue: number[]) => {
    setIsSeeking(false)
    onSeek(newValue[0])
  }

  return (
    <div className={cn('flex flex-row flex-nowrap items-center', className)}>
      <div className="mx-1">{secondsToString(currentTime)}</div>
      <Slider
        className="mx-1"
        aria-labelledby="continuous-slider"
        value={[value]}
        onValueChange={handleValueChange}
        onValueCommit={handleSliderChange}
        max={duration ?? 1}
        step={1}
      />
      <div className="mx-1">{secondsToString(duration - currentTime)}</div>
    </div>
  )
}
