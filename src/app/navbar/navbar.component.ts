import { Component, OnInit } from '@angular/core';
import { getSessionStorage } from '../firebase';
import {User} from '../Interfaces/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor () { 
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
  }
  ngOnInit(): void {

    this.init();
  }


 async init(){
   this.user = await getSessionStorage('user');
  console.log(this.user.isAdmin)
 }

}
