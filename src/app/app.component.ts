import { Component , OnInit } from '@angular/core';
import { getSessionStorage } from './firebase';

import {User} from './Interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
   }
}
