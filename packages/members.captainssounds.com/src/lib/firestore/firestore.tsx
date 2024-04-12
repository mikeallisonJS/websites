'use client'

import { ReactElement, ReactNode } from 'react'
import { getFirestore } from 'firebase/firestore'
import {
  useFirebaseApp,
  FirestoreProvider,
  FirebaseAppProvider
} from 'reactfire'
import { firebaseConfig } from '../firebase'

type FirestoreProps = {
  children: ReactNode
}
export default function Firestore({ children }: FirestoreProps): ReactElement {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <InnerFirestore>{children}</InnerFirestore>
    </FirebaseAppProvider>
  )
}

function InnerFirestore({ children }: FirestoreProps): ReactElement {
  const firestoreInstance = getFirestore(useFirebaseApp())
  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  )
}
