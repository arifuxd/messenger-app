import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8RzD4qelSwbHjsYgdt96u4Z4ZBcOEIt8",
    authDomain: "rocket-messenger-app.firebaseapp.com",
    projectId: "rocket-messenger-app",
    storageBucket: "rocket-messenger-app.appspot.com",
    messagingSenderId: "136004028885",
    appId: "1:136004028885:web:cb0582cd0406f05d96955c"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();