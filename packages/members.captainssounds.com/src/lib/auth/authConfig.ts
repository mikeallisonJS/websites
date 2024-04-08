const authConfig = {
  apiKey: 'AIzaSyCiGuzr59Pd-J31sR5822qKZ5j4B4_UgnQ',
  cookieName: 'AuthToken',
  cookieSignatureKeys: ['secret1', 'secret2'],
  serviceAccount: {
    projectId: 'captains-sounds-members',
    clientEmail:
      'firebase-adminsdk-30kef@captains-sounds-members.iam.gserviceaccount.com',
    privateKey: process.env.FIREBASE_PRIVATE_KEY ?? ''
  }
}

export default authConfig
