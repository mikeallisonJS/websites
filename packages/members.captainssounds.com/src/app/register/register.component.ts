import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      artistName: new FormControl(''),
      email: new FormControl('')
    })
  }
  submit() {
    this.http.post('https://www.aweber.com/scripts/addlead.pl', {
      name: this.form.controls['artistName'].value,
      email: this.form.controls['email'].value,
      listname: 'captainssounds'
    })
  }
}
