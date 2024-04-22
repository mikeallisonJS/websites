import actionCreators from '../actionCreators'
import { Action } from '../reducers'
import { CustomNativeEventTypes } from '../types'

export default function eventHandler(store) {
  if (typeof window === 'undefined') return
  let clearPlaylist = () => {
    store.dispatch(actionCreators.stop())
    store.dispatch(actionCreators.changeTrack(0))
    store.dispatch(actionCreators.updatePlaylist([]))
  }

  window.addEventListener(CustomNativeEventTypes.PLAY, function (e) {
    let playlist = (e as CustomEvent).detail

    if (!playlist) {
      store.dispatch(actionCreators.play())
      return
    } else if (playlist.length >= 1) {
      clearPlaylist()
      store.dispatch(actionCreators.updatePlaylist(playlist))
      store.dispatch(actionCreators.play())
    }
  })

  window.addEventListener(CustomNativeEventTypes.PAUSE, function (e) {
    store.dispatch(actionCreators.pause())
  })

  window.addEventListener(CustomNativeEventTypes.STOP, function (e) {
    store.dispatch(actionCreators.stop())
  })

  window.addEventListener(CustomNativeEventTypes.SET_VOLUME, function (e) {
    let level = (e as CustomEvent).detail
    if (level >= 0 || level <= 100)
      store.dispatch(actionCreators.setVolume(level))
  })

  window.addEventListener(CustomNativeEventTypes.SKIP_NEXT, function (e) {
    store.dispatch(actionCreators.skipNext())
  })

  window.addEventListener(CustomNativeEventTypes.SKIP_PREV, function (e) {
    store.dispatch(actionCreators.skipPrev())
  })

  window.addEventListener(CustomNativeEventTypes.SHUFFLE, function (e) {
    let bool = (e as CustomEvent).detail //typescript cast Event to CustomEvent
    store.dispatch(actionCreators.shuffle(bool))
  })

  window.addEventListener(CustomNativeEventTypes.CHANGE_TRACK, function (e) {
    let index = (e as CustomEvent).detail
    store.dispatch(actionCreators.changeTrack(index))
  })

  window.addEventListener(CustomNativeEventTypes.SET_PLAYLIST, function (e) {
    let playlist = (e as CustomEvent).detail
    if (playlist < 1) clearPlaylist()
    else store.dispatch(actionCreators.updatePlaylist(playlist))
  })

  window.addEventListener(CustomNativeEventTypes.CLEAR_PLAYLIST, function (e) {
    clearPlaylist()
  })

  window.addEventListener(CustomNativeEventTypes.SEEK, function (e) {
    let progress = (e as CustomEvent).detail
    if (progress > 100 || progress < 0) return
    store.dispatch(actionCreators.seek(progress))
  })

  window.addEventListener(CustomNativeEventTypes.SET_REPEAT_MODE, function (e) {
    store.dispatch(actionCreators.setRepeatMode((e as CustomEvent).detail))
  })

  let playNextOrLaterHandler = (e) => {
    let currentPlaylist = store.getState().playlist
    let currentTrack = store.getState().currentTrack

    let newPlaylist = []

    if (e.type === CustomNativeEventTypes.PLAY_NEXT)
      newPlaylist = currentPlaylist.reduce(
        (accumulator, currentValue, index) => {
          if (index === currentTrack)
            return [...accumulator, currentValue, ...e.detail]
          else return [...accumulator, currentValue]
        },
        []
      )
    else if (e.type === CustomNativeEventTypes.PLAY_LATER) {
      newPlaylist = currentPlaylist.concat(e.detail)
    }

    store.dispatch(actionCreators.updatePlaylist(newPlaylist))
  }

  window.addEventListener(
    CustomNativeEventTypes.PLAY_NEXT,
    playNextOrLaterHandler
  )

  window.addEventListener(
    CustomNativeEventTypes.PLAY_LATER,
    playNextOrLaterHandler
  )

  return (next) => (action: Action) => {
    return next(action)
  }
}
