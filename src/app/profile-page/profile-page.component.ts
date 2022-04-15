import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { getUser, getSessionStorage, updateUserData, downloadResume, updateJobStatus, getJobStatus } from '../firebase';
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
  selected = false
  role: string;
  email: string;
  provider: string
  constructor(private router: Router) { 
    this.email = this.router.getCurrentNavigation()?.extras.state?.['userEmail'];
    this.role = this.router.getCurrentNavigation()?.extras.state?.['role'];
    this.provider = this.router.getCurrentNavigation()?.extras.state?.['provider'];
    if (this.email){
      this.init(this.email);
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
    if(this.flag && await getJobStatus(this.user.email, this.role, this.provider) != "Pending"){
      this.selected = true;
    }
  }

  onSubmit(){
    updateUserData(this.user)
  }

  handleResumeDownload(){
    downloadResume(this.role, this.email)
  }

  async handleStatus(status){
    await updateJobStatus(this.user.email, this.role, this.provider, status);
  }

}
