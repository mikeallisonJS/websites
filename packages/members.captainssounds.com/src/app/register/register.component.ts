import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  disabled = false
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    protected authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      artistName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      verifyPassword: new FormControl('')
    })
  }
  async submit(): Promise<void> {
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
