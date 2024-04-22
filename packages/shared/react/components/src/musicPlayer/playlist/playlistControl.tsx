import { ReactNode, RefObject, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity } from '@fortawesome/free-solid-svg-icons/faInfinity'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat'
import { faShuffle } from '@fortawesome/free-solid-svg-icons/faShuffle'

import Playlist from './playlist'

import { RepeatMode } from '../types'
import { Toggle } from '../../toggle'
import { Popover } from '../../popover'
import { Collapsible } from '../../collapsible'
import { useMusicStore } from '../useMusicStore'
import { useShallow } from 'zustand/react/shallow'
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
  audioRef: RefObject<HTMLAudioElement>
  className?: string
  playlistViewMode: string
}
export default function PlaylistControl({
  className,
  playlistViewMode,
  audioRef
}: PlaylistControlProps) {
  const { shuffled, repeatMode, setRepeatMode, setShuffled } = useMusicStore(
    useShallow((state) => state)
  )

  const [playlistVisible, showPlaylist] = useState(false)
  // const [anchorEl, setAnchor] = useState(null)

  const onShuffle = (bool: boolean) => setShuffled(bool)
  const onRepeat = (mode: RepeatMode) => setRepeatMode(mode)

  const handlePopoverClose = () => {
    showPlaylist(false)
    // setAnchor(null)
  }

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
          pressed={playlistVisible}
          onChange={(e) => {
            // setAnchor(
            //   e.target.parentElement.parentElement.parentElement.parentElement
            // )
            showPlaylist(!playlistVisible)
          }}
        >
          <FontAwesomeIcon icon={faList} />
        </Toggle>
      </ButtonContainer>

      {playlistViewMode === 'popover' ? (
        <Popover
          open={playlistVisible}
          // anchorEl={anchorEl}
          onOpenChange={handlePopoverClose}
          // anchorOrigin={{
          //   vertical: 'top',
          //   horizontal: 'right'
          // }}
          // transformOrigin={{
          //   vertical: 'bottom',
          //   horizontal: 'right'
          // }}
        >
          <Playlist
            audioRef={audioRef}
            className={`w-[400px] h-[60vh] ${playlistVisible ? '' : 'hidden'}`}
          />
        </Popover>
      ) : (
        <Collapsible>
          <Playlist
            audioRef={audioRef}
            className={`w-[90vw] h-[60vh] ${playlistVisible ? '' : 'hidden'}`}
          />
        </Collapsible>
      )}
    </RootBox>
  )
}
