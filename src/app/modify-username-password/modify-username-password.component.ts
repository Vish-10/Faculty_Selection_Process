import { Component, OnInit } from '@angular/core';
import { changePassword, getSessionStorage } from '../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-username-password',
  templateUrl: './modify-username-password.component.html',
  styleUrls: ['./modify-username-password.component.css']
})
export class ModifyUsernamePasswordComponent{

  emailID: string = ""
  password: string = ""
  oldemail: string

  constructor(private router: Router) {
    this.oldemail = getSessionStorage("userEmail")
   }

  async handleChangePassword(){
    if (this.password != "") {
      if (await changePassword(this.password)){
        alert("Password changed successfully")
        this.router.navigateByUrl('/profile')
      }
      else{
        alert("Relogin and try to change password again")
      }
    }
    else{
      alert("Please Fill all the required Fields")
    }
  }

}
