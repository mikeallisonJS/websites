import { Injectable } from '@angular/core'
import { AudioService, StreamState } from './audio.service'
import { Observable } from 'rxjs'
import { Song, songs } from '../songs'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  files = songs
  currentFile: any = {}
  state?: StreamState = undefined
  constructor(public audioService: AudioService) {
    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state
    })
    this.currentFile = { index: 0, file: this.files[0] }
  }
  init() {}
  openFile(file: Song, index: number) {
    this.currentFile = { index, file }
    // this.audioService.stop();
    return this.audioService.playStream(file.url).subscribe()
  }
  next() {
    const index = this.currentFile.index + 1
    const file = this.files[index]
    this.openFile(file, index)
  }
  previous() {
    const index = this.currentFile.index - 1
    const file = this.files[index]
    return this.openFile(file, index)
  }
  pause() {
    return this.audioService.pause()
  }
  play() {
    if (this.audioService.audioObj.currentTime === 0) {
      return this.audioService.playStream(this.currentFile.file.url).subscribe()
    } else {
      return this.audioService.play()
    }
  }
  stop() {
    return this.audioService.stop()
  }
}
