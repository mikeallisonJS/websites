import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Functions, httpsCallableData } from '@angular/fire/functions'
import { Observable } from 'rxjs'

@Component({
  selector: 'websites-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  form: FormGroup
  disabled = false
  aweberSignUp: (data: {
    name: string
    email: string
  }) => Observable<{ result: boolean }>
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private functions: Functions
  ) {
    this.form = this.formBuilder.group({
      artistName: new FormControl(''),
      email: new FormControl('')
    })
    this.aweberSignUp = httpsCallableData(this.functions, 'aweberSignUp')
  }

  async submit() {
    this.disabled = true
    await this.aweberSignUp({
      name: this.form.controls['artistName'].value,
      email: this.form.controls['email'].value
    }).subscribe((result) => {
      this.disabled = false
      console.log(result)
      if (result.result) {
        this.router.navigate(['/special-offer'])
      }
    })
  }
}
