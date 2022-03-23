import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {User} from '../Interfaces/User';
import {login, addSessionStorage, forgotPassword} from '../firebase';
import { Router } from '@angular/router';

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

  async handleForgotPassword(){
    forgotPassword(this.user.email)
  }

}
