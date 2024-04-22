import { ActionTypes, RepeatMode, Track } from './types'

const ActionCreators = {
  changeTrack: (index: number) => ({
    type: ActionTypes.CHANGE_TRACK,
    payload: {
      index: index
    }
  }),

  play: () => ({
    type: ActionTypes.PLAY
  }),

  pause: () => ({
    type: ActionTypes.PAUSE
  }),

  stop: () => ({
    type: ActionTypes.STOP
  }),

  updatePlaylist: (playlist: Track[]) => ({
    type: ActionTypes.UPDATE_PLAYLIST,
    payload: {
      playlist: playlist
    }
  }),

  shuffle: (bool: boolean) => ({
    type: ActionTypes.SHUFFLE,
    payload: { shuffle: bool }
  }),

  setCurrentTime: (currentTime: number) => ({
    type: ActionTypes.SET_CURRENT_TIME,
    payload: {
      currentTime: currentTime
    }
  }),

  setTimeLeft: (timeLeft: number) => ({
    type: ActionTypes.SET_TIME_LEFT,
    payload: {
      timeLeft: timeLeft
    }
  }),

  seek: (progress: number) => ({
    type: ActionTypes.SEEK,
    payload: {
      progress: progress
    }
  }),

  setVolume: (volume: number) => ({
    type: ActionTypes.CHANGE_VOLUME,
    payload: {
      volume: volume
    }
  }),

  setRepeatMode: (mode: RepeatMode) => ({
    type: ActionTypes.SET_REPEAT_MODE,
    payload: {
      mode: mode
    }
  }),

  skipNext: () => ({
    type: ActionTypes.SKIP_NEXT
  }),

  skipPrev: () => ({
    type: ActionTypes.SKIP_PREV
  })
}

export default ActionCreators
