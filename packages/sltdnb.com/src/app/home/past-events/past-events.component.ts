import { Component, HostListener } from '@angular/core'

const images = [
  'sltdnb-23-9',
  'sltdnb-23-7',
  'sltdnb-23-5',
  'uv-23-1',
  'uv-22-12',
  'uv-22-9',
  'uv-22-8',
  'uv-22-7',
  'uv-22-5',
  'uv-22-4',
  'uv-22-3',
  'eventhorizon',
  'uv-22-2',
  'uv-22-1',
  'uv-21-12',
  'welcomehome'
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
