import { Component, OnInit } from '@angular/core';
import { Job } from '../Interfaces/Job';
import { addJobData, getSessionStorage, getUser, updateJob } from '../firebase';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {

  job: Job = {
    name: "",
    deadline: "",
    provider: "",
    JD: "",
    eligibilty: "",
    id: ""
}

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
  email: string
  flag: boolean = false

  constructor(private router: Router) { 
    this.email = getSessionStorage("userEmail")
    var temp = this.router.getCurrentNavigation()?.extras.state?.['jobdetails'];
    this.init();
    if (temp) {
      this.job = temp
      this.flag = true
    }
  }

  async init(){
    this.user = await getUser(this.email)
    this.job.provider = this.user.isAdmin;
    
  }

  handleAddJob(){
    if(this.job.JD != "" && this.job.deadline != "" && this.job.eligibilty != "" && this.job.name != ""){
      if(!this.flag){
        addJobData(this.job);
        alert("Job added Successfully")
        this.router.navigateByUrl("/home-page")
      }
      else{  
        updateJob(this.job)
        alert("Job updated Successfully")
        this.router.navigateByUrl("/home-page")
      }
    }
    else{
      alert("Please Fill all the required Fields")
    }
  }

}
