// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail, ProviderId   } from "firebase/auth";
import { collection, addDoc, query, setDoc, where, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { getFirestore, deleteDoc } from "firebase/firestore"
import {User} from './Interfaces/User';
import {Job} from './Interfaces/Job';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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
      alert("Incorrect EmailId or Password")
      console.log(err);
      return false;
    })
  return flag;
}

export async function addUserData(user: User){//dont save pass
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

export async function uploadFileHelper(file, jobProvider, jobName, userEmail){
  const fileName = jobProvider + '/' + jobName + '/' + userEmail;
  const storageRef = ref(storage, fileName);
  var flag = await uploadBytes(storageRef, file).then(async (snapshot) => {
    const newApplication = await addDoc(collection(db, 'appliedJobs'), {user: userEmail, provider: jobProvider, name: jobName, status: 'Pending', documentVerificationSlot: ''})
    return true;
  }).catch((error) => {
    alert("File not uploaded");
    return false;
    // ..
  });
  return flag;
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

export function forgotPassword(email){
  console.log(email)
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("verification mail sent")
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    alert("Please check the EmailId")
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export async function changePassword(newPassword){
  const user = auth.currentUser;
  return await updatePassword(user, newPassword).then(() => {
    // Update successful.
    console.log("Update Done")
    return true
  }).catch((error) => {
    // An error ocurred
    // ...
    console.log(error)
    return false
  });
}

export async function downloadResume(role, email){
  var userEmail = getSessionStorage("userEmail")
  const user = await getUser(userEmail);
  const storagePath = user.isAdmin + '/' + role + '/' + email;
  getDownloadURL(ref(storage, storagePath))
  .then(url => {
    window.open(url, '_blank');
  })
}

export async function updateJobStatus(email, jobName, provider, value){
  console.log(email, jobName, provider)
  const q = query(collection(db, "appliedJobs"), where("provider", "==", provider), where("name", "==", jobName), where("user", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (tempUser) => {
    console.log("inside")
    const userRef = doc(db, "appliedJobs", tempUser.id);
    await updateDoc(userRef, {
      status: value,
    });//show alert
  });
}

export async function getJobStatus(email, jobName, provider,) {
  var q = query(collection(db, "appliedJobs"), where("provider", "==", provider), where("name", "==", jobName), where("user", "==", email));
  var job;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    job=doc.data();
  })
  return job.status;
}

export async function deleteUserAccount(email){
  const users = query(collection(db, 'users'), where('email', '==', email))
  const querySnap = await getDocs(users);
  var tempUserId;
  querySnap.forEach((docs) => {
    tempUserId = docs.id;
  })
  await deleteDoc(doc(db, "users", tempUserId));
  var q = query(collection(db, "appliedJobs"), where("user", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(docT => {
    var temp = docT.data()
    const desertRef = ref(storage, temp['provider']+ '/' + temp['name'] + '/' + temp['user']);
    deleteObject(desertRef).then(async () => {
      await deleteDoc(doc(db, 'appliedJobs', docT.id))
    }).catch((error) => {
      console.log("error")
    });
  })
}

export async function getAllSlots(provider, jobName){
  var q = query(collection(db, "documentVerificationSlots"), where("provider", "==", provider), where("jobName", "==", jobName));
  var slots = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    slots.push(doc.data());
  })
  return slots;
}

export async function addSlot(provider, jobName, date, time, seats){
  const newSlot = await addDoc(collection(db, 'documentVerificationSlots'), {provider: provider, jobName: jobName, date: date, time: time, maxSeats: seats, remainingSeats: seats});
  //add alert
}

export async function withdrawApplication(email, jobName, provider) {
  var q = query(collection(db, "appliedJobs"), where("user", "==", email), where("name", "==", jobName),where("provider", "==", provider));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async docT => {
    var temp = docT.data()
    const desertRef = ref(storage, temp['provider']+ '/' + temp['name'] + '/' + temp['user']);
    await deleteObject(desertRef).then(async () => {
      await deleteDoc(doc(db, 'appliedJobs', docT.id))
    }).catch((error) => {
      console.log("error")
    });
  })
}

export async function updateDocSlot(date, time, jobName, provider, email){
  var q = query(collection(db, "appliedJobs"), where("provider", "==", provider), where("name", "==", jobName), where("user", "==", email));
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (tempUser) => {
    console.log("inside")
    if (tempUser.data()['documentVerificationSlot'] == ""){
      var q = query(collection(db, "documentVerificationSlots"), where("provider", "==", provider), where("jobName", "==", jobName), where("date", "==", date), where("time", "==", time));
      var querySnapshot1 = await getDocs(q);
      querySnapshot1.forEach(async (data) =>{
        if (data.data()['remainingSeats'] > 0){
          const userRef = doc(db, "appliedJobs", tempUser.id);
          await updateDoc(userRef, {
            documentVerificationSlot: date + "+" + time,
          });
          console.log(data.id);
          const docSlotRef = doc(db, 'documentVerificationSlots', data.id);
          await updateDoc(docSlotRef, {
            remainingSeats: (data.data()['remainingSeats'] - 1),
          })
        }
        else{
          console.log("Error No slots available");//alert
        }
      })
    }
    else{
      var q = query(collection(db, "documentVerificationSlots"), where("provider", "==", provider), where("jobName", "==", jobName), where("date", "==", date), where("time", "==", time));
      var querySnapshot1 = await getDocs(q);
      querySnapshot1.forEach(async (data) =>{
        if (data.data()['remainingSeats'] > 0){
          const userRef = doc(db, "appliedJobs", tempUser.id);
          var oldDocumentVerficationSlot = tempUser.data()['documentVerificationSlot'].split("+")
          var q = query(collection(db, "documentVerificationSlots"), where("provider", "==", provider), where("jobName", "==", jobName), where("date", "==", oldDocumentVerficationSlot[0]), where("time", "==", oldDocumentVerficationSlot[1]));
          var querySnapshot2 = await getDocs(q);
          querySnapshot2.forEach(async (oldSlot) => {
            const docSlotRefOld = doc(db, 'documentVerificationSlots', oldSlot.id);
            await updateDoc(docSlotRefOld, {
              remainingSeats: oldSlot.data()['remainingSeats'] + 1,
            })
          })
          await updateDoc(userRef, {
            documentVerificationSlot: date + "+" + time,
          });
          const docSlotRef = doc(db, 'documentVerificationSlots', data.id);
          await updateDoc(docSlotRef, {
            remainingSeats: data.data()['remainingSeats'] - 1,
          })
        }
      });
    }
    
  })
}
