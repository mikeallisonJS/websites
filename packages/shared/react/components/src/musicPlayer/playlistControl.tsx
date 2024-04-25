import { faInfinity } from '@fortawesome/free-solid-svg-icons/faInfinity'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faShuffle } from '@fortawesome/free-solid-svg-icons/faShuffle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

import { cn } from '@websites/shared/react/lib'

import { Toggle } from '../toggle'

import { RepeatMode } from './types'

type RootBoxProps = {
  children: ReactNode
  className?: string
}

const RootBox = ({ children, className }: RootBoxProps) => (
  <div className={cn('flex flex-col-reverse items-center', className)}>
    {children}
  </div>
)

type ButtonContainerProps = {
  children: ReactNode
}

const ButtonContainer = ({ children }: ButtonContainerProps) => (
  <div className="flex flex-row w-full">{children}</div>
)

type PlaylistControlProps = {
  className?: string
  isPlaylistOpen: boolean
  repeatMode: RepeatMode
  shuffled: boolean
  onRepeatModeChange: (mode: RepeatMode) => void
  onShuffledChange: (bool: boolean) => void
  onOpenDrawer: () => void
  onCloseDrawer: () => void
}
export default function PlaylistControl({
  className,
  isPlaylistOpen,
  repeatMode,
  shuffled,
  onOpenDrawer,
  onCloseDrawer,
  onRepeatModeChange,
  onShuffledChange
}: PlaylistControlProps) {
  const onShuffle = (bool: boolean) => onShuffledChange(bool)
  const onRepeat = (mode: RepeatMode) => onRepeatModeChange(mode)

  return (
    <RootBox className={className}>
      <ButtonContainer>
        <Toggle
          value="repeat"
          pressed={repeatMode !== RepeatMode.NORMAL}
          className={'m-auto grow-1'}
          onClick={() => {
            switch (repeatMode) {
              case RepeatMode.NORMAL:
                return onRepeat(RepeatMode.REPEAT_ALL)
              case RepeatMode.REPEAT_ALL:
                return onRepeat(RepeatMode.REPEAT_ONE)
              case RepeatMode.REPEAT_ONE:
                return onRepeat(RepeatMode.NORMAL)
              default:
                return repeatMode
            }
          }}
        >
          <FontAwesomeIcon
            icon={repeatMode === RepeatMode.REPEAT_ONE ? faInfinity : faRepeat}
          />
        </Toggle>

        <Toggle
          className={'m-auto grow-1'}
          value="shuffle"
          pressed={shuffled}
          onClick={() => {
            onShuffle(!shuffled)
          }}
        >
          <FontAwesomeIcon icon={faShuffle} />
        </Toggle>

        <Toggle
          className={'m-auto grow-1'}
          value="show playlist"
          pressed={isPlaylistOpen}
          onClick={isPlaylistOpen ? onCloseDrawer : onOpenDrawer}
        >
          <FontAwesomeIcon icon={faList} />
        </Toggle>
      </ButtonContainer>
    </RootBox>
  )
}
