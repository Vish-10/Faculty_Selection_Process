import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Job} from '../Interfaces/Job';
import {User} from '../Interfaces/User';
import { getSessionStorage, uploadFileHelper, getUser, deleteJob, getAppliedStatus, getJobApplicants} from '../firebase';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent{
  user:User = {
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

  job: Job
  email: boolean
  userEmail : string
  keys: string
  file: File
  applied: Boolean
  applicants: any
  data : any

  constructor(private router:Router){ 
    this.job = this.router.getCurrentNavigation()?.extras.state?.['jobDetails'];
    this.userEmail = getSessionStorage('userEmail') 
    this.keys = Object.keys(this.userEmail)[0];
    this.file = null;
    this.applied = false;
    if(this.keys == 'false'){
      this.email = false;
    }
    else{
      this.email = true
      this.handleUserData();
    }
  }

  async handleUserData(){
    this.user = await getUser(this.userEmail);
    this.applicants =await getJobApplicants(this.user.isAdmin , this.job.name);
    this.data = []
    for (const details of this.applicants){
      this.data.push(await getUser(details.user))
    }
    this.user.isAdmin = this.user.isAdmin == this.job.provider? 'true' : 'false';
    this.applied = await getAppliedStatus(this.userEmail, this.job.provider, this.job.name)
  }

  onChange(event){
    this.file = event.target.files[0];
  }

  handleEdit(){
    this.router.navigateByUrl('/addJob', {state: {jobdetails: this.job}})
  }

  handleDelete(){
    deleteJob(this.job)
    alert("Job Deleted Successfully")
    this.router.navigateByUrl('/home-page')
  }

  viewApplicantDetails(email){
    console.log(email)
    this.router.navigateByUrl("/profile", {state: {userEmail: email, role: this.job.name, provider: this.job.provider}})
  }

  async onUpload(){
    if (this.file == null){
      alert("Please Upload Resume")
    }
    else{
      console.log(this.file);
      var flag = await uploadFileHelper(this.file, this.job.provider, this.job.name, this.userEmail)
      if (flag){
        this.applied = true
      alert("Job Applied Successfully")
      }
    }
    
  }

  handleSlots(){
    this.router.navigateByUrl("/manageslots", {state: {role: this.job.name, provider: this.job.provider}});
  }
}
