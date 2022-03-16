import { Component, OnInit } from '@angular/core';
import { Job } from '../Interfaces/Job';
import { addJobData, getSessionStorage, getUser } from '../firebase';
import { User } from '../Interfaces/User';

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

  constructor() { 
    this.email = getSessionStorage("userEmail")
    this.init();
  }

  ngOnInit(): void {
  }

  async init(){
    this.user = await getUser(this.email)
  }

  handleAddJob(){
    addJobData(this.job);
  }

}
