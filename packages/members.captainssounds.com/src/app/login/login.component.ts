import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
}
