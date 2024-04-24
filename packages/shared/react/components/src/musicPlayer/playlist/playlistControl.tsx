import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity } from '@fortawesome/free-solid-svg-icons/faInfinity'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faShuffle } from '@fortawesome/free-solid-svg-icons/faShuffle'

import Playlist from './playlist'

import { RepeatMode, Track } from '../types'
import { Toggle } from '../../toggle'
import { cn } from '@websites/shared/react/lib'

const PREFIX = 'PlaylistControl'

const classes = {
  button: `${PREFIX}-button m-auto grow-1`
}

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

type RepeatButtonProps = {
  value: RepeatMode
  className?: string
  onClick: () => void
}
function RepeatButton({
  value,
  className,
  onClick,
  ...other
}: RepeatButtonProps) {
  return (
    <Toggle
      value="repeat"
      pressed={value !== RepeatMode.NORMAL}
      className={className}
      onClick={onClick}
      {...other}
    >
      <FontAwesomeIcon
        icon={value === RepeatMode.REPEAT_ONE ? faInfinity : faRepeat}
      />
    </Toggle>
  )
}

type ShuffleButtonProps = {
  value: boolean
  className?: string
  onClick: () => void
}

function ShuffleButton({
  value,
  className,
  onClick,
  ...other
}: ShuffleButtonProps) {
  return (
    <Toggle
      value="shuffle"
      pressed={value}
      className={className}
      onClick={onClick}
      {...other}
    >
      <FontAwesomeIcon icon={faShuffle} />
    </Toggle>
  )
}

type PlaylistControlProps = {
  className?: string
  playlist: Track[]
  currentTrack: Track | null
  isPlaylistOpen: boolean
  repeatMode: RepeatMode
  shuffled: boolean
  onRepeatModeChange: (mode: RepeatMode) => void
  onShuffledChange: (bool: boolean) => void
  onTrackIndexChange: (index: number) => void
  onPlaylistChange: (newList: Track[]) => void
  onShowPlaylistToggle: () => void
  playlistViewMode: string
}
export default function PlaylistControl({
  className,
  playlistViewMode,
  playlist,
  currentTrack,
  isPlaylistOpen,
  repeatMode,
  shuffled,
  onShowPlaylistToggle,
  onRepeatModeChange,
  onShuffledChange,
  onTrackIndexChange,
  onPlaylistChange
}: PlaylistControlProps) {
  const onShuffle = (bool: boolean) => onShuffledChange(bool)
  const onRepeat = (mode: RepeatMode) => onRepeatModeChange(mode)

  return (
    <RootBox className={className}>
      <ButtonContainer>
        <RepeatButton
          value={repeatMode}
          className={classes.button}
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
        />
        <ShuffleButton
          value={shuffled}
          className={classes.button}
          onClick={() => {
            onShuffle(!shuffled)
          }}
        />

        <Toggle
          className={classes.button}
          value="show playlist"
          pressed={isPlaylistOpen}
          onChange={onShowPlaylistToggle}
        >
          <FontAwesomeIcon icon={faList} />
        </Toggle>
      </ButtonContainer>

      {playlistViewMode !== 'popover' && (
        <Playlist
          currentTrack={currentTrack}
          playlist={playlist}
          onPlaylistChange={onPlaylistChange}
          onTrackIndexChange={onTrackIndexChange}
          className={`w-[90vw] h-[60vh] ${isPlaylistOpen ? '' : 'hidden'}`}
        />
      )}
    </RootBox>
  )
}
