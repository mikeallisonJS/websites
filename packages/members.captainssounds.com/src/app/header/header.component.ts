import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ScrollService } from '@websites/common'
import { animate, style, transition, trigger } from '@angular/animations'

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
  constructor(public router: Router, public scrollService: ScrollService) {}
}