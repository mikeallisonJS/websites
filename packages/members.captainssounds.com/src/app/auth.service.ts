import { Injectable, NgZone } from '@angular/core'
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore'
import {
  Auth,
  AuthProvider,
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
        })
      }
      localStorage.removeItem('user')
    })
  }
  async signIn(email: string, password: string) {
    const result = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    ).catch((error) => {
      window.alert(error.message)
    })
    if (result?.user == null) return result
    this.setUserData(result.user)
    authState(this.auth).subscribe((user) => {
      if (user) {
        this.router.navigate(['products'])
      }
    })
  }
  async signUp(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).catch((error) => window.alert(error))
    if (result?.user == null) return result
    this.sendVerificationMail()
    this.setUserData(result.user)
    return result
  }
  async sendVerificationMail() {
    const currentUser = await this.auth.currentUser
    if (currentUser == null) return
    await sendEmailVerification(currentUser)
    this.router.navigate(['verify-email-address'])
  }
  async forgotPassword(passwordResetEmail: string) {
    await sendPasswordResetEmail(this.auth, passwordResetEmail).catch((error) =>
      window.alert(error)
    )
    window.alert('Password reset email sent, check your inbox.')
  }
  get isLoggedIn(): boolean {
    const userObj = localStorage.getItem('user')
    if (userObj == null) return false
    const user = JSON.parse(userObj)
    return user.emailVerified !== false ? true : false
  }
  googleAuth() {
    this.authLogin(new GoogleAuthProvider())
  }
  async authLogin(provider: AuthProvider) {
    const result = await signInWithPopup(this.auth, provider).catch((error) =>
      window.alert(error)
    )
    if (result?.user == null) return result
    this.setUserData(result?.user)
    this.router.navigate(['products'])
    return result
  }
  setUserData(user: User) {
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
    })
  }
  async signOut() {
    await signOut(this.auth)
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }
}
