import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'

import CoverArt from '../coverArt'
import withoutPropagation from '../utils/withoutPropagation'
import { Track } from '../types'

type PlaylistItemTemplateProps = {
  item: Track
  dragHandleProps: any
  itemSelected: boolean
  commonProps: {
    currentTrackID: string
    listOfID: string[]
    onTrackSelect: (index: number) => void
  }
}

export default function PlaylistItemTemplate({
  item,
  dragHandleProps,
  itemSelected,
  commonProps
}: PlaylistItemTemplateProps) {
  function handleSelect() {
    commonProps.onTrackSelect(commonProps.listOfID.indexOf(item.ID))
  }

  return (
    <div className="h-full flex flex-row items-center flex-nowrap border border-divider rounded p-2 shadow-sm transition-shadow">
      <div
        className="flex grow-1 items-center"
        onClick={withoutPropagation(handleSelect)}
      >
        {/*render now playing icon or empty box matching icon size */}
        {commonProps.currentTrackID === item.ID ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <div className="w-[24px] h-[24px]" />
        )}
        <CoverArt src={item.coverArt} className="h-[48px] w-[48px]" />

        <div className="w-[50px] grow shrink mx-1">
          <div className="w-full text-sm whitespace-nowrap overflow-hidden">
            {item.title}
          </div>
          <div className="w-full text-xs whitespace-nowrap overflow-hidden">
            {item.artist}
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="mx-1"
        {...dragHandleProps}
        onClick={(e) => {
          e.stopPropagation()
        }}
      />
    </div>
  )
}
