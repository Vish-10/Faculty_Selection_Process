import { Component, OnInit } from '@angular/core';
import {User} from '../Interfaces/User';

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
    console.log(this.user.firstname, this.user.lastname, this.user.phoneNumber, this.user.DOB);
  }

}
