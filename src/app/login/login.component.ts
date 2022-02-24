import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {User} from '../Interfaces/User';
import {login} from '../firebase';

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
    DOB:new Date()
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

  handleSubmit(){
    console.log(this.user.email, this.user.password)
    login(this.user.email, this.user.password);
  }

}
