import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { getUser, getSessionStorage, updateUserData } from '../firebase';
import { Router } from '@angular/router';

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
  flag = false

  constructor(private router: Router) { 
    var email = this.router.getCurrentNavigation()?.extras.state?.['userEmail'];
    if (email){
      this.init(email);
      this.flag = true;
    }
    else{
      this.init(getSessionStorage("userEmail"))
    }
  }

  ngOnInit(): void {
  }

  async init(email){
    this.user = await getUser(email)
  }

  async onSubmit(){
    updateUserData(this.user)
  }

}
