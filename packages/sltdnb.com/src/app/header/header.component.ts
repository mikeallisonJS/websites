import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ScrollService } from '@websites/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    protected scrollService: ScrollService,
    protected router: Router
  ) {}
}
