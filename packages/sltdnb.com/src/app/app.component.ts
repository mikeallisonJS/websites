import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { ScrollService } from '@websites/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    protected scrollService: ScrollService,
    protected router: Router
  ) {}
  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  scrollHandler(e: Event): void {
    this.scrollService.scrollPos = (e.target as Element).scrollTop
  }
}