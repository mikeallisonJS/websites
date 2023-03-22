import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
  artistName = new FormControl('')
  email = new FormControl('')
  constructor(private http: HttpClient) {}
  submit() {
    this.http.post('https://www.aweber.com/scripts/addlead.pl', {
      name: this.artistName.value,
      email: this.email.value,
      listname: 'captainssounds'
    })
  }
}
