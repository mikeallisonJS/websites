import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

function secondsToHHmmss(secs: number) {
  const sec_num = parseInt(secs.toString(), 10) // don't forget the second param
  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - hours * 3600) / 60)
  const seconds = sec_num - hours * 3600 - minutes * 60

  const hoursString = hours < 10 ? '0' + hours : hours
  const minutesString = minutes < 10 ? '0' + minutes : minutes
  const secondsString = seconds < 10 ? '0' + seconds : seconds
  return hours > 0
    ? hoursString + ':' + minutesString + ':' + secondsString
    : minutesString + ':' + secondsString
}

export interface StreamState {
  playing: boolean
  readableCurrentTime: string
  readableDuration: string
  duration: number | undefined
  currentTime: number | undefined
  canplay: boolean
  error: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject()
  public audioObj = new Audio()
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ]

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  )

  private streamObservable(url: string, play = true) {
    return new Observable((observer) => {
      // Play audio
      this.audioObj.src = url
      this.audioObj.load()
      if (play) {
        this.audioObj.play()
      }

      const handler = (event: Event) => {
        this.updateStateEvents(event)
        observer.next(event)
      }

      this.addEvents(this.audioObj, this.audioEvents, handler)
      return () => {
        // Stop Playing
        this.audioObj.pause()
        this.audioObj.currentTime = 0
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler)
        // reset state
        this.resetState()
      }
    })
  }

  private addEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.addEventListener(event, handler)
    })
  }

  private removeEvents(
    obj: HTMLAudioElement,
    events: string[],
    handler: (event: Event) => void
  ) {
    events.forEach((event) => {
      obj.removeEventListener(event, handler)
    })
  }

  loadStream(url: string) {
    return url
      ? this.streamObservable(url, false).pipe(takeUntil(this.stop$))
      : null
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$))
  }

  play() {
    return this.audioObj.play()
  }

  pause() {
    return this.audioObj.pause()
  }

  stop() {
    return this.stop$.next(undefined)
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds
  }

  formatTime(time: number) {
    return secondsToHHmmss(time)
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration
        this.state.readableDuration = this.formatTime(this.state.duration)
        this.state.canplay = true
        break
      case 'playing':
        this.state.playing = true
        break
      case 'pause':
        this.state.playing = false
        break
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime)
        break
      case 'error':
        this.resetState()
        this.state.error = true
        break
    }
    this.stateChange.next(this.state)
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    }
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable()
  }
}
