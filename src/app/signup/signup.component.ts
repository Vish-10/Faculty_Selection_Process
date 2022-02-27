import { Component, OnInit } from '@angular/core';
import {User} from '../Interfaces/User';
import {signUp} from '../firebase';
import { Router } from '@angular/router';

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

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  async handleSubmit(){
    var flag =await signUp(this.user);
    if (flag){
      this.router.navigate(['./login'])
    }
  }

}
