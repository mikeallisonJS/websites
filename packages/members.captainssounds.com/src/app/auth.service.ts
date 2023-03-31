import { Injectable, NgZone } from '@angular/core'
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth'
import { Router } from '@angular/router'

export interface UserData {
  _id: string
  email: string
  displayName: string
  photoURL: string | null
  emailVerified: boolean
  products?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: UserData
  constructor(
    public firestore: Firestore, // Inject Firestore service
    public auth: Auth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    authState(this.auth).subscribe((user) => {
      if (user) {
        const userRef = doc(this.firestore, `users/${user.uid}`)
        getDoc(userRef).then((doc) => {
          this.userData = doc.data() as UserData
          localStorage.setItem('user', JSON.stringify(this.userData))
          JSON.parse(localStorage.getItem('user') ?? '{}')
          this.router.navigate(['account'])
        })
      }
      localStorage.removeItem('user')
      JSON.parse(localStorage.getItem('user') ?? '{}')
      this.router.navigate([''])
    })
  }
  signIn(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        if (result?.user == null) return
        this.setUserData(result.user)
      })
      .catch((error) => {
        window.alert(error.message)
      })
  }
  signUp(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        if (result?.user == null) return result
        this.sendVerificationMail()
        this.setUserData(result.user)
        return result
      })
      .catch((error) => window.alert(error))
  }
  sendVerificationMail(): void {
    const currentUser = this.auth.currentUser
    if (currentUser == null) return
    sendEmailVerification(currentUser).then(() => {
      this.router.navigate(['verify-email-address'])
    })
  }
  forgotPassword(passwordResetEmail: string): void {
    sendPasswordResetEmail(this.auth, passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.')
      })
      .catch((error) => window.alert(error))
  }
  get isLoggedIn(): boolean {
    const userObj = localStorage.getItem('user')
    if (userObj == null) return false
    const user = JSON.parse(userObj)
    return user.emailVerified !== false ? true : false
  }
  googleAuth(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        if (result?.user == null) return result
        this.setUserData(result?.user)
        this.router.navigate(['products'])
        return result
      })
      .catch((error) => window.alert(error))
  }
  setUserData(user: User): void {
    const userRef = doc(this.firestore, `users/${user.uid}`)
    const userData: UserData = {
      _id: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? 'No Name',
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    setDoc(userRef, userData, {
      merge: true
    })
  }
  signOut(): void {
    signOut(this.auth)
  }
}
