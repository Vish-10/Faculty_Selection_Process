// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, setDoc, where, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { getFirestore, deleteDoc } from "firebase/firestore"
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

export async function updateUserData(user: User){
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (tempUser) => {
    const userRef = doc(db, "users", tempUser.id);
    await updateDoc(userRef, {
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      DOB: user.DOB,
      state: user.state,
      city: user.city,
      address: user.address
    });//show alert
  });
}

export async function deleteJob(job:Job) {
  await deleteDoc(doc(db, "jobs", job.id));
}

export async function addJobData(job: Job){
  const newUser = await addDoc(collection(db, 'jobs'), job)
  console.log(newUser);
}

export async function getUser(email: string){
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

export async function updateJob(job: Job){
  await setDoc(doc(db, "jobs", job.id), job);
}

export async function logOutFirebase() {
  var flag = await signOut(auth).then(() => {
    return true;
  }).catch((error) => {
    return false;
  });
  return flag;
}

export function uploadFileHelper(file, jobProvider, jobName, userEmail){
  const fileName = jobProvider + '/' + jobName + '/' + userEmail;
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file).then(async (snapshot) => {
    const newApplication = await addDoc(collection(db, 'appliedJobs'), {user: userEmail, provider: jobProvider, name: jobName, status: 'pending'})
  });
}

export async function getAppliedStatus(email, provider, jobName){
  var q = query(collection(db, "appliedJobs"), where("user", "==", email), where("provider", "==", provider), where("name", "==", jobName));
  var tempApplication;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    tempApplication = doc.data();
  })
  return tempApplication? true : false;
}

export async function getJobApplicants(provider, jobName) {
  var q = query(collection(db, "appliedJobs"), where("provider", "==", provider), where("name", "==", jobName));
  var applicants = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    applicants.push(doc.data());
  })
  return applicants;
}

export async function getAppliedJobs(email) {
  var q = query(collection(db, "appliedJobs"), where("user", "==", email));
  var jobs = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    jobs.push(doc.data());
  })
  return jobs;
}