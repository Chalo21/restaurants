import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB0UqvHyOUJRJmvQ0jlGLDKF93eWxIvIas",
    authDomain: "restaurants-2f3b2.firebaseapp.com",
    projectId: "restaurants-2f3b2",
    storageBucket: "restaurants-2f3b2.appspot.com",
    messagingSenderId: "457272680983",
    appId: "1:457272680983:web:34c0548cfcc5d9e2efb252"
  }
  firebase.initializeApp(firebaseConfig)