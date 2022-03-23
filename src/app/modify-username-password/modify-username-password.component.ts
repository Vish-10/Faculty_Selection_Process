import { Component, OnInit } from '@angular/core';
import { changePassword, getSessionStorage } from '../firebase';

@Component({
  selector: 'app-modify-username-password',
  templateUrl: './modify-username-password.component.html',
  styleUrls: ['./modify-username-password.component.css']
})
export class ModifyUsernamePasswordComponent implements OnInit {

  emailID: string = ""
  password: string = ""
  oldemail: string

  constructor() {
    this.oldemail = getSessionStorage("userEmail")
   }

  ngOnInit(): void {
  }

  handleChangePassword(){
    changePassword(this.password)
  }

}
