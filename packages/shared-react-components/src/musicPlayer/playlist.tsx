import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ScrollArea } from '../scrollArea'
import { Table, TableBody, TableCell, TableRow } from '../table'

import CoverArt from './coverArt'
import type { Track } from './types'

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
                className="cursor-pointer py-1"
              >
                <div className="flex flex-row gap-2 align-middle">
                  {/*render now playing icon or empty box matching icon size */}
                  {currentTrack?.ID === track.ID ? (
                    <FontAwesomeIcon
                      icon={faPlay}
                      size="lg"
                      className="flex w-[36px] py-2 align-middle"
                    />
                  ) : (
                    <div className="h-[36px] w-[36px]" />
                  )}
                  <CoverArt
                    src={track.coverArt}
                    className="h-[36px] w-[36px]"
                  />

                  <div className="mx-1 w-[50px] shrink grow">
                    <div className="w-full overflow-hidden whitespace-nowrap text-sm">
                      {track.title}
                    </div>
                    <div className="w-full overflow-hidden whitespace-nowrap text-xs">
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
