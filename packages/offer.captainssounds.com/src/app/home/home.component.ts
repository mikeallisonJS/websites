import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'websites-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  form: FormGroup
  disabled = false
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      artistName: new FormControl(''),
      email: new FormControl('')
    })
  }

  async submit() {
    this.disabled = true
    await this.http.post('https://www.aweber.com/scripts/addlead.pl', {
      name: this.form.controls['artistName'].value,
      email: this.form.controls['email'].value,
      listname: 'captainssounds'
    })
    this.router.navigate(['/special-offer'])
    this.disabled = false
  }
}
