import actionCreator from '../actionCreators'
import { Action } from '../reducers'

const mediaSessionActions = (store) => {
  // check for MediaSession support
  if (typeof navigator === 'undefined')
    return (next) => (action: Action) => next(action)
  if (navigator?.mediaSession !== undefined) {
    navigator.mediaSession.setActionHandler('play', () =>
      store.dispatch(actionCreator.play())
    )

    navigator.mediaSession.setActionHandler('pause', () =>
      store.dispatch(actionCreator.pause())
    )

    navigator.mediaSession.setActionHandler('nexttrack', () =>
      store.dispatch(actionCreator.skipNext())
    )

    navigator.mediaSession.setActionHandler('previoustrack', () =>
      store.dispatch(actionCreator.skipPrev())
    )
  }

  return (next) => (action: Action) => next(action)
}

export default mediaSessionActions
