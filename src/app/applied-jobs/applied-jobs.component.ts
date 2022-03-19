import { Component, OnInit } from '@angular/core';
import { getAppliedJobs, getSessionStorage } from '../firebase';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  data: any

  constructor() { 
    this.init()
  }

  ngOnInit(): void {
  }

  async init(){
    this.data = await getAppliedJobs(getSessionStorage('userEmail'))
  }

}
