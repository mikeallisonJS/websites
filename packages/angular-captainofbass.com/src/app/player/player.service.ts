import { Injectable } from '@angular/core'
import { AudioService, StreamState } from './audio.service'
import { Song, songs } from '../songs'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  files = songs
  currentFile: { index: number; file?: Song } = { index: 0 }
  state?: StreamState = undefined
  constructor(public audioService: AudioService) {
    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state
    })
    this.currentFile = { index: 0, file: this.files[0] }
  }
  openFile(file: Song, index: number): Subscription {
    this.currentFile = { index, file }
    return this.audioService.playStream(file.url).subscribe()
  }
  next(): void {
    const index = this.currentFile.index + 1
    const file = this.files[index]
    this.openFile(file, index)
  }
  previous(): Subscription {
    const index = this.currentFile.index - 1
    const file = this.files[index]
    return this.openFile(file, index)
  }
  pause(): void {
    this.audioService.pause()
  }
  play(): Subscription | Promise<void> | void {
    if (this.currentFile.file === undefined) return
    if (this.audioService.audioObj.currentTime === 0) {
      return this.audioService.playStream(this.currentFile.file.url).subscribe()
    } else {
      return this.audioService.play()
    }
  }
  stop(): void {
    this.audioService.stop()
  }
}
