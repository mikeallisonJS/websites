import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { ScrollService } from '@websites/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Captain'
  constructor(public router: Router, public scrollService: ScrollService) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  scrollHandler(e: Event) {
    this.scrollService.scrollPos = (e.target as Element).scrollTop
  }
}
