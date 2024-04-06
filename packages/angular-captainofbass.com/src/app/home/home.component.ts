import { Component, EventEmitter, Output } from '@angular/core'
import { ScrollService } from '@websites/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Output() sidenavClose = new EventEmitter()
  constructor(
    public router: Router,
    public scrollService: ScrollService
  ) {}
}
