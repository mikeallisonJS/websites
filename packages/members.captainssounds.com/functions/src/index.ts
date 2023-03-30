import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as cors from 'cors'
import { uatEmails } from './uat-emails'
import { xor } from 'lodash'

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

const corsHelper = cors({ origin: 'https://offer.captainssounds.com' })

export interface UserData {
  _id: string
  email: string
  displayName: string
  photoURL: string | null
  emailVerified: boolean
  products?: string[]
}

function isSimilarArray(a: string[], b: string[]) {
  return a.length === b.length && xor(a, b).length === 0
}

export const getPurchases = functions.https.onRequest((request, response) => {
  corsHelper(request, response, () => {
    const { uid } = request.body
    const userDoc = db.doc(`users/${uid}`)
    userDoc.get().then((userData) => {
      const user = userData.data() as UserData
      // don't bother if they already have everything
      if (!user.products?.includes('ultimate-ableton-templates')) {
        const result = user.products ?? []
        if (uatEmails.includes(user.email))
          result.push('ultimate-ableton-templates')
        if (isSimilarArray(result, user.products ?? []))
          userDoc.set({ products: result }, { merge: true })
      }
      response.send({ user })
    })
  })
})
