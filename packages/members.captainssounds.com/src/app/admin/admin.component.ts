import { Component } from '@angular/core'
import { AuthService } from '../auth.service'
import { Functions, httpsCallableData } from '@angular/fire/functions'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    protected authService: AuthService,
    private functions: Functions
  ) {}
  checkClickfunnels(): void {
    const checkPurchases = httpsCallableData<void, { message: string }>(
      this.functions,
      'refreshClickfunnelOrders'
    )
    checkPurchases().subscribe((result) => {
      alert(result.message)
    })
  }
  checkShopify(): void {
    const checkPurchases = httpsCallableData<void, { message: string }>(
      this.functions,
      'refreshShopifyOrders'
    )
    checkPurchases().subscribe((result) => {
      alert(result.message)
    })
  }
}
