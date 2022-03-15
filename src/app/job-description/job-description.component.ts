import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Job} from '../Interfaces/Job' 

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {

  job: Job

  constructor(private router:Router){ 
    this.job = this.router.getCurrentNavigation()?.extras.state?.['jobdetails'];
    this.init();
  }
  init() {
  }

  ngOnInit(): void {}
  

}
