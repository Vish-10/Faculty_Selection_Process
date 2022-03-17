import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { getUser, getSessionStorage, updateUserData } from '../firebase';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

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
  email : string

  constructor() { 
    this.email = getSessionStorage("userEmail")
    this.init();
    
  }

  ngOnInit(): void {
  }

  async init(){
    this.user = await getUser(this.email)
  }

  async onSubmit(){
    updateUserData(this.user)
  }

}
