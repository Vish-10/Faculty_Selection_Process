import { Component, OnInit } from '@angular/core';
import {User} from '../Interfaces/User';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = {
    firstname: '',
    lastname: '',
    phoneNumber: 91,
    email: '',
    address: '',
    password: '',
    state: '',
    city: '',
    DOB:new Date()
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(){
    app();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
      .then((userCredential) => {
        console.log('signed up', userCredential);
      //add the user info to firestore
      })
      .catch((err) => {
        console.log(err);
      })
  }

}
