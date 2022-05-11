import { Component, OnInit } from '@angular/core';
import {User} from '../Interfaces/User';
import {signUp} from '../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{

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

  async handleSubmit(){
    if (this.user.firstname != "" && this.user.lastname != "" && this.user.email != "" && this.user.password != ""){
      var flag =await signUp(this.user);
      if (flag){
        this.router.navigate(['./login'])
      }
    }
    else{
      alert("Please Fill all required Fields");
    }
  }

}
