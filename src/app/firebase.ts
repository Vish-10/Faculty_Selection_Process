// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore"
import {User} from './Interfaces/User';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUJF9znJzGUSPE54X6jfQ-UoU5gQRS_jE",
  authDomain: "faculty-selection-process.firebaseapp.com",
  databaseURL: "https://faculty-selection-process-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "faculty-selection-process",
  storageBucket: "faculty-selection-process.appspot.com",
  messagingSenderId: "1021283817810",
  appId: "1:1021283817810:web:98e8ffee3db6d5715f428b",
  measurementId: "G-29965WEXVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

//signUp
export function signUp(user: User){
  createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log('signed up', userCredential);
        addUserData(user);
      })
      .catch((err) => {
        console.log(err);
      })
}

//login
export function login(email: string, password: string){
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('logged in', userCredential);
    })
    .catch((err) => {
      console.log(err);
    })
}

async function addUserData(user: User){
  const newUser = await addDoc(collection(db, 'users'), user)
  console.log(newUser);
}