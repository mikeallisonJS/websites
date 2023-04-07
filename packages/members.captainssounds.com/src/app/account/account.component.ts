import { Component } from '@angular/core'
import { Functions, httpsCallableData } from '@angular/fire/functions'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  checkDisabled = false
  constructor(
    protected authService: AuthService,
    private functions: Functions,
    private route: ActivatedRoute
  ) {}
  checkPurchases(): void {
    this.checkDisabled = true
    const checkPurchases = httpsCallableData(this.functions, 'getPurchases')
    checkPurchases({ uid: this.authService.userData._id }).subscribe(
      (result) => {
        this.checkDisabled = false
        console.log(result)
      }
    )
  }
}
