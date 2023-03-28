import { Component } from '@angular/core'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(protected authService: AuthService) {}
}
