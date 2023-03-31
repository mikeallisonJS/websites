import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'websites-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) {}

  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }
}
