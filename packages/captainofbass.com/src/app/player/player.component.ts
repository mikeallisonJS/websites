import { Component, OnInit } from '@angular/core'
import { AudioService } from './audio.service'
import { PlayerService } from './player.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  constructor(
    public audioService: AudioService,
    public playerService: PlayerService
  ) {}
  ngOnInit(): void {
    this.audioService.loadStream(this.playerService.files[0]?.url)
  }
  isFirstPlaying() {
    return this.playerService.currentFile.index === 0
  }
  isLastPlaying() {
    return (
      this.playerService.currentFile.index ===
      this.playerService.files.length - 1
    )
  }
  onSliderChangeEnd(value: number) {
    this.audioService.seekTo(value)
  }
}
