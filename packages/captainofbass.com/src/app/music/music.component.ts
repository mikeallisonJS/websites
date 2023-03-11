import { Component, OnInit } from '@angular/core'
import { PlayerService } from '../player/player.service'
import { songs, Song } from '../songs'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {
  public files = songs
  constructor(public playerService: PlayerService) {}
  select(song: Song, index: number) {
    this.playerService.openFile(song, index)
  }
}
