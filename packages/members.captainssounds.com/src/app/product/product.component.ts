import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { Firestore, getDoc } from '@angular/fire/firestore'
import { DomSanitizer } from '@angular/platform-browser'
import { doc } from '@firebase/firestore'
import { Product } from './product.interface'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnChanges {
  selectedImage = 0
  @Input() product: Product
  downloadUrl: string | null = null
  constructor(
    protected sanitizer: DomSanitizer,
    private firestore: Firestore
  ) {}
  ngOnChanges(): void {
    const downloadRef = doc(this.firestore, `/downloads/${this.product.id}`)
    getDoc(downloadRef)
      .then((doc) => {
        this.downloadUrl = doc.get('links')[0] as string
      })
      .catch(() => {
        this.downloadUrl = null
      })
  }
}
