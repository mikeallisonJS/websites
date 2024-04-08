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
import { MatSnackBar } from '@angular/material/snack-bar'

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
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private snackBar: MatSnackBar
  ) {
    authState(this.auth).subscribe((user) => {
      if (user) {
        const userRef = doc(this.firestore, `users/${user.uid}`)
        getDoc(userRef).then((doc) => {
          this.userData = doc.data() as UserData
          localStorage.setItem('user', JSON.stringify(this.userData))
          JSON.parse(localStorage.getItem('user') ?? '{}')
          // this.router.navigate(['account'])
        })
      }
      localStorage.removeItem('user')
      JSON.parse(localStorage.getItem('user') ?? '{}')
      // this.router.navigate([''])
    })
  }
  signIn(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        if (result?.user == null) return
        this.setUserData(result.user).then(() => {
          this.router.navigate(['products'])
        })
      })
      .catch((error) => this.snackBar.open(error.message, 'Dismiss'))
  }
  signUp(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        if (result?.user == null) return result
        this.sendVerificationMail()
        this.setUserData(result.user)
        return result
      })
      .catch((error) => this.snackBar.open(error, 'Dismiss'))
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
        this.snackBar.open(
          'Password reset email sent, check your inbox.',
          'Dismiss'
        )
      })
      .catch((error) => this.snackBar.open(error.message, 'Dismiss'))
  }
  get isLoggedIn(): boolean {
    if (this.userData == null) return false
    return this.userData.emailVerified !== false ? true : false
  }
  googleAuth(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        if (result?.user == null) return result
        this.setUserData(result?.user)
        this.router.navigate(['products'])
        return result
      })
      .catch((error) => this.snackBar.open(error, 'Dismiss'))
  }
  setUserData(user: User): Promise<void> {
    const userRef = doc(this.firestore, `users/${user.uid}`)
    const userData: UserData = {
      _id: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? 'No Name',
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return setDoc(userRef, userData, {
      merge: true
    }).then(() => {
      const orderRef = doc(this.firestore, `orders/${user.email}`)
      return getDoc(orderRef).then((order) => {
        userData.products = order.get('products') ?? []
      })
    })
  }
  signOut(): void {
    signOut(this.auth)
    this.router.navigate([''])
  }
}
