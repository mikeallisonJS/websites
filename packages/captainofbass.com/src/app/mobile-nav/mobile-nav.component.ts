import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
  @Output() sidenavClose = new EventEmitter()

  public onSidenavClose = () => {
    this.sidenavClose.emit()
  }
}
