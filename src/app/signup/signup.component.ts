import { Component, OnInit } from '@angular/core';
import {User} from '../Interfaces/User';
import {signUp} from '../firebase';

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
    signUp(this.user);
  }

}
