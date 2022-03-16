import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {addSessionStorage, getAllJobs, getUser} from '../firebase';
import {User} from '../Interfaces/User';
import {Job} from '../Interfaces/Job';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  data : Iterable<any>;
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
  
  constructor (private router:Router) { 
    this.data = [];
    this.init();
  }

  ngOnInit(): void {
  }

  async init(){
    var email = this.router.getCurrentNavigation()?.extras.state?.['email'];
    this.user = await getUser(email)
    if(email){
      addSessionStorage('userEmail', email);
    }
    this.data = await getAllJobs();
  }

  jobdescription(job: any) {
    this.router.navigateByUrl('/job-description', {state: {jobdetails: job}})
  }

}
