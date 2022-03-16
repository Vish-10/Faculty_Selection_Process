import { Component, OnInit } from '@angular/core';
import { getSessionStorage, logOutFirebase } from '../firebase';
import {User} from '../Interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  email: boolean;
  keys: string
  userEmail : string

  constructor (private router : Router) { 
    this.user  = {
      firstname: '',
      lastname: '',
      phoneNumber: 91,
      email: '',
      address: '',
      password: '',
      state: '',
      city: '',
      DOB:new Date(),
      isAdmin: false
    };
    this.userEmail = getSessionStorage('userEmail') 
    this.keys = Object.keys(this.userEmail)[0];
    if(this.keys == 'false'){
      this.email = false;
    }
    else{
      this.email = true
    }
  }
  ngOnInit(): void {
  }



 async logOut(){
    sessionStorage.removeItem('userEmail');
    var flag = await logOutFirebase();
    if (flag) {
      this.router.navigate(['./login']);
    } else {
      console.log("Signout error") ;
    }
 }

}
