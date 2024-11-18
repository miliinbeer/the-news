import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA4psk_5yAWCl-9RVH6ivBA-JW7BPQHIw4',
  authDomain: 'the-posts.firebaseapp.com',
  projectId: 'the-posts',
  storageBucket: 'the-posts.appspot.com',
  messagingSenderId: '1076577863153',
  appId: '1:1076577863153:web:2f46a091f16d0ba1bbb050'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const database = getDatabase(firebaseApp)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
