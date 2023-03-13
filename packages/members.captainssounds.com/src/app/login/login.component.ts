import { Component, OnInit } from '@angular/core'
import * as firebaseui from 'firebaseui'
import firebase from 'firebase/compat/app'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService) {}
  ngOnInit(): void {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', this.auth.uiConfig)
  }
}
