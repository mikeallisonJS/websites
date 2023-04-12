import { Component } from '@angular/core'
import { AuthService } from '../auth.service'
import { Functions, httpsCallableData } from '@angular/fire/functions'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(
    protected authService: AuthService,
    private functions: Functions,
    private snackBar: MatSnackBar
  ) {}
  checkClickfunnels(): void {
    const checkPurchases = httpsCallableData<void, { message: string }>(
      this.functions,
      'refreshClickfunnelOrders'
    )
    checkPurchases().subscribe((result) => {
      this.snackBar.open(result.message, 'Dismiss')
    })
  }
  checkShopify(): void {
    const checkPurchases = httpsCallableData<void, { message: string }>(
      this.functions,
      'refreshShopifyOrders'
    )
    checkPurchases().subscribe((result) => {
      this.snackBar.open(result.message, 'Dismiss')
    })
  }
  checkGumroad(): void {
    const checkPurchases = httpsCallableData<void, { message: string }>(
      this.functions,
      'refreshGumroadOrders'
    )
    checkPurchases().subscribe((result) => {
      this.snackBar.open(result.message, 'Dismiss')
    })
  }
}
