// 'use client'

// import { RepeatMode, Track } from './types'
// import { useMusicStore } from './useMusicStore'
// import { useShallow } from 'zustand/react/shallow'

// function play(playlist?: Track[]) {
//   const { setPlaylist, setState } = useMusicStore(useShallow((state) => state))
//   if (playlist !== undefined) setPlaylist(playlist)
//   setState(ActionTypes.PLAY)
// }

// function pause() {
//   const { setState } = useMusicStore((state) => state)
//   setState(ActionTypes.PAUSE)
// }

// function stop() {
//   const { setState } = useMusicStore((state) => state)
//   setState(ActionTypes.STOP)
// }

// function setVolume(level: number) {
//   const { setVolume } = useMusicStore((state) => state)
//   setVolume(level)
// }

// function skipNext() {
//   const { setState } = useMusicStore((state) => state)
//   setState(ActionTypes.SKIP_NEXT)
// }

// function skipPrev() {
//   const { setState } = useMusicStore((state) => state)
//   setState(ActionTypes.SKIP_PREV)
// }

// function shuffle(bool: boolean) {
//   const { setShuffled } = useMusicStore((state) => state)
//   setShuffled(bool)
// }

// function seek(progress: number) {
//   const { setCurrentTime } = useMusicStore((state) => state)
//   setCurrentTime(progress)
// }

// function setRepeatMode(mode: RepeatMode) {
//   const { setRepeatMode } = useMusicStore((state) => state)
//   setRepeatMode(mode)
// }

// function changeTrack(index: number) {
//   const { setCurrentTrack } = useMusicStore((state) => state)
//   setCurrentTrack(index)
// }

// function playNext(nextPlaylist: Track[]) {
//   const { playlist, currentTrack, setPlaylist } = useMusicStore(
//     (state) => state
//   )
//   setPlaylist([
//     ...playlist.slice(0, currentTrack),
//     ...nextPlaylist,
//     ...playlist.slice(currentTrack + 1, playlist.length - 1)
//   ])
// }

// function playLater(laterPlaylist: Track[]) {
//   const { playlist, setPlaylist } = useMusicStore((state) => state)
//   setPlaylist([...playlist, ...laterPlaylist])
// }

// function setPlaylist(playlist: Track[]) {
//   const { setPlaylist } = useMusicStore((state) => state)
//   setPlaylist(playlist)
// }

// function clearPlaylist() {
//   const { setPlaylist } = useMusicStore((state) => state)
//   setPlaylist([])
// }

// function getState() {
//   return useMusicStore((state) => state)
// }

// const interfaceObject = {
//   play: play,
//   pause: pause,
//   stop: stop,
//   setVolume: setVolume,
//   skipNext: skipNext,
//   skipPrev: skipPrev,
//   shuffle: shuffle,
//   seek: seek,
//   setRepeatMode: setRepeatMode,
//   changeTrack: changeTrack,
//   playNext: playNext,
//   playLater: playLater,
//   setPlaylist: setPlaylist,
//   clearPlaylist: clearPlaylist,
//   getState: getState
// }

// export default interfaceObject
