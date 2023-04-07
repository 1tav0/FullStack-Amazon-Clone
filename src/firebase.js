import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiHPscdreiE5Ru4RZwro1jsjpLqXMUchY",
    authDomain: "clone-a2778.firebaseapp.com",
    projectId: "clone-a2778",
    storageBucket: "clone-a2778.appspot.com",
    messagingSenderId: "1018697502033",
    appId: "1:1018697502033:web:458a1ce1b9797120f55770"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {auth, db}