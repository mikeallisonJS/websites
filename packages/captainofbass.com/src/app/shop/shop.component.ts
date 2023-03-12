import { Component, OnInit } from '@angular/core'
import { ShopService } from './shop.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  constructor(protected readonly shopService: ShopService) {}
}
