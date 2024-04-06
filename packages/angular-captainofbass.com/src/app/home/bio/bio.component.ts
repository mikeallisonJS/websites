import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent {
  constructor(public router: Router) {}
}
