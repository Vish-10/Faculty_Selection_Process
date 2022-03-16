// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore"
import {User} from './Interfaces/User';
import {Job} from './Interfaces/Job';
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const storage = getStorage();

//signUp
export async function signUp(user: User){
  var flag = await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log('signed up', userCredential);
        addUserData(user);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  return flag;
}

//login
export async function login(email: string, password: string){
  var flag = await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    })
  return flag;
}

async function addUserData(user: User){//dont save pass
  const newUser = await addDoc(collection(db, 'users'), user)
  console.log(newUser);
}

export async function getUser(email: string){
  console.log(email)
  const users = query(collection(db, 'users'), where('email', '==', email))
  const querySnap = await getDocs(users);
  var tempUser;
  querySnap.forEach((docs) => {
    tempUser = docs.data();
  })
  return tempUser;
}

export function addSessionStorage(key: string, value: string){
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSessionStorage(key: string){
  return JSON.parse(sessionStorage.getItem(key) || '{"false" : "false"}');
}

export async function getAllJobs(){
  const jobs = await getDocs(collection(db, "jobs"));
  var jobLists: Job[] = [];
  jobs.forEach((temp) => {
    var job = temp.data()
    jobLists.push({id: temp.id, name: job['name'], provider: job['provider'], deadline: job['deadline'], eligibilty: job['eligibilty'], JD: job['JD']});
  });
  return jobLists;
}

export async function logOutFirebase() {
  var flag = await signOut(auth).then(() => {
    return true;
  }).catch((error) => {
    return false;
  });
  return flag;
}

export function uploadFileHelper(file, jobName, userEmail){
  const fileName = jobName + '/' + userEmail;
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');//show alert
  });
}