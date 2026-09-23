import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYEGxuMTE4aOvQP5rtZbExVPjabO8vodg',
  authDomain: 'pulsoscallejeros-fe294.firebaseapp.com',
  projectId: 'pulsoscallejeros-fe294',
  storageBucket: 'pulsoscallejeros-fe294.firebasestorage.app',
  messagingSenderId: '40370949774',
  appId: '1:40370949774:web:8a848509b876134668c3df',
  measurementId: 'G-1DZNMLL7T9',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
