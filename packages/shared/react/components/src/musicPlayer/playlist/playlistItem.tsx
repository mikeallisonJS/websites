import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'

import CoverArt from '../coverArt'
import { Track } from '../types'

type PlaylistItemTemplateProps = {
  track: Track
  playlist: Track[]
  currentTrack: Track | null
  onTrackSelect: (index: number) => void
}

export default function PlaylistItem({
  track,
  playlist,
  currentTrack,
  onTrackSelect
}: PlaylistItemTemplateProps) {
  function handleSelect() {
    onTrackSelect(playlist.findIndex(({ ID }) => ID === track.ID))
  }

  return (
    <div className="h-full flex flex-row items-center flex-nowrap border border-divider rounded p-2 shadow-sm transition-shadow">
      <div className="flex grow-1 items-center" onClick={handleSelect}>
        {/*render now playing icon or empty box matching icon size */}
        {currentTrack?.ID === track.ID ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <div className="w-[24px] h-[24px]" />
        )}
        <CoverArt src={track.coverArt} className="h-[48px] w-[48px]" />

        <div className="w-[50px] grow shrink mx-1">
          <div className="w-full text-sm whitespace-nowrap overflow-hidden">
            {track.title}
          </div>
          <div className="w-full text-xs whitespace-nowrap overflow-hidden">
            {track.artist}
          </div>
        </div>
      </div>
    </div>
  )
}
