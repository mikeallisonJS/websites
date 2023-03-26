import { Injectable, NgZone } from '@angular/core'
import * as auth from 'firebase/auth'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
// import {
//   AngularFirestore,
//   AngularFirestoreDocument
// } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'

export interface UserData {
  uid: string
  email: string
  displayName: string
  photoURL: string
  emailVerified: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: UserData
  constructor(
    public afs: Firestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as UserData
        localStorage.setItem('user', JSON.stringify(this.userData))
        // return JSON.parse(localStorage.getItem('user')!)
      }
      localStorage.removeItem('user')
      // JSON.parse(localStorage.getItem('user')!)
    })
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    const result = await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        window.alert(error.message)
      })
    if (result?.user == null) return result
    this.setUserData(result.user)
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.router.navigate(['products'])
      }
    })
  }
  // Sign up with email/password
  async signUp(email: string, password: string) {
    const result = await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => window.alert(error))
    if (result?.user == null) return result
    this.sendVerificationMail()
    this.setUserData(result.user)
    return result
  }
  async sendVerificationMail() {
    const currentUser = await this.afAuth.currentUser
    await currentUser?.sendEmailVerification()
    this.router.navigate(['verify-email-address'])
  }
  async forgotPassword(passwordResetEmail: string) {
    await this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .catch((error) => window.alert(error))
    window.alert('Password reset email sent, check your inbox.')
  }
  get isLoggedIn(): boolean {
    const userObj = localStorage.getItem('user')
    if (userObj == null) return false
    const user = JSON.parse(userObj)
    return user.emailVerified !== false ? true : false
  }
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['products'])
    })
  }
  async authLogin(provider: any) {
    const result = await this.afAuth
      .signInWithPopup(provider)
      .catch((error) => window.alert(error))
    this.setUserData(result?.user as UserData)
    this.router.navigate(['products'])
    return result
  }
  setUserData(user: UserData) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(
      `users/${user.uid}`
    )
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['sign-in'])
    })
  }
}
