import { Component } from '@angular/core'
import { ShopService } from '../shop.service'

@Component({
  selector: 'app-shop-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  constructor(protected readonly shopService: ShopService) {}
}
