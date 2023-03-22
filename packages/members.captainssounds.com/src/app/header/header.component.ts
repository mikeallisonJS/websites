import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { ScrollService } from '@websites/common'
import { animate, style, transition, trigger } from '@angular/animations'
import { MatTabNavPanel } from '@angular/material/tabs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class HeaderComponent {
  @Input() tabPanel?: MatTabNavPanel
  constructor(public router: Router, public scrollService: ScrollService) {}
}
