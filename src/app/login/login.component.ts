import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {User} from '../Interfaces/User';
import {login, addSessionStorage, GoogleAuth,addUserData, getUser} from '../firebase';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    firstname: '',
    lastname: '',
    phoneNumber: 91,
    email: '',
    address: '',
    password: '',
    state: '',
    city: '',
    DOB:new Date(),
    isAdmin: "false"
  }
  auth = getAuth();
  
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  async handleSubmit(){
    var flag = await login(this.user.email, this.user.password);
    if (flag){
      addSessionStorage('userEmail', this.user.email);
      this.router.navigateByUrl('/home-page', {state: {email: this.user.email}})
    }
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    var flag = false;
    var tempemail = "";
    await signInWithPopup(this.auth,provider).then(async function(result) {

       let temp = { firstname: result.user.displayName,
       lastname: '',
       phoneNumber: 91,
       email: result.user.email,
       address: '',
       password: '',
       state: '',
       city: '',
       DOB:new Date(),
       isAdmin: "false"}

       const checkUser = await getUser(temp.email);
       if(!checkUser)
        addUserData(temp)
      flag = true;
      tempemail = temp.email
      
      }).catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
     
       console.log(error.code)
       console.log(error.message)
    });
    if(flag){
      addSessionStorage('userEmail', tempemail);
    this.router.navigateByUrl('/profile')
    }
 }
}
