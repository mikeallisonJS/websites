import { Component, OnInit } from '@angular/core'
import { Functions, httpsCallableData } from '@angular/fire/functions'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  checkDisabled = false
  admin = false
  constructor(
    protected authService: AuthService,
    private functions: Functions,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.admin = params['admin'] === 'true'
    })
  }
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
