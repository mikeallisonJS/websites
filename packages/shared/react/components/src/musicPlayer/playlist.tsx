import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ScrollArea } from '../scrollArea'
import { Table, TableBody, TableCell, TableRow } from '../table'

import CoverArt from './coverArt'
import { Track } from './types'

type PlaylistProps = {
  playlist: Track[]
  currentTrack: Track | null
  onPlaylistSelect: (index: number) => void
  className?: string
}
export default function Playlist({
  playlist,
  currentTrack,
  onPlaylistSelect
}: PlaylistProps) {
  return (
    <ScrollArea className="h-[50vh] w-full">
      <Table>
        <TableBody>
          {playlist.map((track: Track, index) => (
            <TableRow key={track.ID}>
              <TableCell
                onClick={() => onPlaylistSelect(index)}
                className="py-1 cursor-pointer"
              >
                <div className="flex flex-row gap-2">
                  {/*render now playing icon or empty box matching icon size */}
                  {currentTrack?.ID === track.ID ? (
                    <FontAwesomeIcon icon={faPlay} className="w-[24px]" />
                  ) : (
                    <div className="w-[24px] h-[24px]" />
                  )}
                  <CoverArt
                    src={track.coverArt}
                    className="h-[24px] w-[24px]"
                  />

                  <div className="w-[50px] grow shrink mx-1">
                    <div className="w-full text-sm whitespace-nowrap overflow-hidden">
                      {track.title}
                    </div>
                    <div className="w-full text-xs whitespace-nowrap overflow-hidden">
                      {track.artist}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}