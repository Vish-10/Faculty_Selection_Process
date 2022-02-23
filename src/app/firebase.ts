// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
export const app = () => initializeApp(firebaseConfig);
const analytics = getAnalytics(app());