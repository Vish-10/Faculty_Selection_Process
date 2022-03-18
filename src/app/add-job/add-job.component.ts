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
export class AddJobComponent implements OnInit {

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
    console.log(temp)
    this.init();
    if (temp) {
      this.job = temp
      this.flag = true
    }
  }

  ngOnInit(): void {
  }

  async init(){
    this.user = await getUser(this.email)
    this.job.provider = this.user.isAdmin;
    
  }

  handleAddJob(){
    if(!this.flag)
      addJobData(this.job);
    else  
      updateJob(this.job)
  }

  handleUpdate(){
    
  }

}
