import { Component, HostListener } from '@angular/core'

const images = [
  'uv-23-1',
  'uv-22-12',
  'dnbatthelake2',
  'dnbatthelake',
  'uv-22-5',
  'eventhorizon',
  'uv-22-2',
  'uv-21-12',
  'welcomehome',
  'skrillex',
  'tittsworth',
  'potd',
  'redbull',
  'mrk1',
  'skynet',
  'phace',
  'potd2',
  'vaski',
  'ufo',
  'teebee',
  'yes',
  'mwff',
  'hybrid',
  'yes2',
  'nightrain',
  'bassic',
  'delano',
  'unify',
  'wildthings',
  'pj',
  'pleasure',
  'food10',
  'move',
  'dfuse',
  'tps'
]
@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.scss']
})
export class PastEventsComponent {
  selectedImage?: string
  images: Array<Array<string>> = [[], [], []]
  constructor() {
    images.forEach((image, index) => {
      this.images[index % 3].push(image)
    })
  }

  select(e: Event): void {
    this.selectedImage = (e.target as HTMLImageElement).src
  }

  closeCover(): void {
    this.selectedImage = undefined
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    this.closeCover()
  }
}
