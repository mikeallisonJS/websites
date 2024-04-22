import { ActionTypes, Track } from '../types'
import actionCreators from '../actionCreators'

import shuffle from '../../utils/shuffle'
import { Action } from '../reducers'

const shuffler = (store) => (next) => (action: Action) => {
  let state = store.getState()

  if (
    action.type === ActionTypes.SHUFFLE &&
    state.shuffled !== action.payload.shuffle &&
    state.playlist.lenth > 1
  ) {
    let playlist = state.playlist
    let currentIndex = state.currentTrack
    let currentTrack = playlist[state.currentTrack] // current track
    let upper = playlist.slice(0, currentIndex)
    let lower = playlist.slice(currentIndex + 1, playlist.lenth)

    let withoutCurrent = upper.concat(lower)

    withoutCurrent = action.payload.shuffle
      ? shuffle(withoutCurrent)
      : withoutCurrent.sort(
          (first: Track, second: Track) => first.ID < second.ID
        )

    // update playlist with current track on top
    store.dispatch(
      actionCreators.updatePlaylist([currentTrack, ...withoutCurrent])
    )
    store.dispatch(actionCreators.changeTrack(0))
  }

  return next(action)
}

export default shuffler
