import { firebaseConfig } from '../firebase'

const authConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  cookieName: 'AuthToken',
  cookieSignatureKeys: ['secret1', 'secret2'],
  serviceAccount: {
    projectId: firebaseConfig.projectId,
    clientEmail:
      'firebase-adminsdk-30kef@captains-sounds-members.iam.gserviceaccount.com',
    privateKey: process.env.FIREBASE_PRIVATE_KEY ?? ''
  }
}

export default authConfig
