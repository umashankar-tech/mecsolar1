import firebase from 'firebase'
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCvai0kGMNvWnn4vaP3G0D0QoDa_okbw4U",
  authDomain: "login-3c42b.firebaseapp.com",
  projectId: "login-3c42b",
  storageBucket: "login-3c42b.appspot.com",
  messagingSenderId: "708654619487",
  appId: "1:708654619487:web:7fc1b9028e286a1744f4ea",
  measurementId: "G-L5ZJV6R5FH"
})

export const auth = app.auth();
export const db = app.firestore();
export default app
