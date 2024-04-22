import secondsToString from './utils/secondsToString'
import { Slider } from '../slider'
import { useMusicStore } from './useMusicStore'
import { useShallow } from 'zustand/react/shallow'
import { cn } from '@websites/shared/react/lib'
import { useEffect } from 'react'

type ProgressBarProps = {
  audioRef: React.RefObject<HTMLAudioElement>
  className?: string
}
export default function ProgressBar({ audioRef, className }: ProgressBarProps) {
  const { duration, currentTime, setCurrentTime } = useMusicStore(
    useShallow((state) => state)
  )

  useEffect(() => {
    if (audioRef.current == null) return
    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current?.currentTime ?? 0)
    }
  }, [audioRef])

  const onSeek = (progress: number) => {
    if (audioRef.current == null) return
    audioRef.current.currentTime = progress
    setCurrentTime(progress)
  }

  const handleSliderChange = (newValue: number[]) => {
    onSeek(newValue[0])
  }

  return (
    <div className={cn('flex flex-row flex-nowrap items-center', className)}>
      <div className="mx-1">
        {secondsToString(audioRef.current?.currentTime ?? 0)}
      </div>
      <Slider
        className="mx-1"
        aria-labelledby="continuous-slider"
        defaultValue={[currentTime]}
        onValueCommit={handleSliderChange}
        step={1}
        max={duration}
      />
      <div className="mx-1">{secondsToString(duration - currentTime)}</div>
    </div>
  )
}
