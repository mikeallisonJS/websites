import { Component } from '@angular/core'
import { Functions, httpsCallableData } from '@angular/fire/functions'
import { ActivatedRoute } from '@angular/router'
import { AuthService, UserData } from '../auth.service'

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
    const checkPurchases = httpsCallableData<
      void,
      { message: string; user?: UserData }
    >(this.functions, 'getPurchases')
    checkPurchases().subscribe((result) => {
      if (result.message != 'ok') alert(result.message)
      else alert(`${result.user?.products?.length ?? 0} products found`)
      this.checkDisabled = false
    })
  }
}
