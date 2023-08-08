/** @format */

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCNB_3BqwnB4Varzcv1q3g5AjDSPQYXqBc',
  authDomain: 'unicorn-rainbows.firebaseapp.com',
  projectId: 'unicorn-rainbows',
  storageBucket: 'unicorn-rainbows.appspot.com',
  messagingSenderId: '754120759383',
  appId: '1:754120759383:web:7cd0a694a7f8d0e1fb2b12',
  measurementId: 'G-SLXVG5XXH6',
}

export const firebaseApp = initializeApp(firebaseConfig)
