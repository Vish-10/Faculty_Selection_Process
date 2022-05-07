import { Component, OnInit } from '@angular/core';
import { getAppliedJobs, getSessionStorage, withdrawApplication, getAllSlots } from '../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  data: any
  constructor(private router:Router) { 
    this.init()
  }

  ngOnInit(): void {
  }

  async init(){
    this.data = await getAppliedJobs(getSessionStorage('userEmail'));
    for (let i = 0; i < this.data.length; i++) {
      var slots = await getAllSlots(this.data[i].provider, this.data[i].name)
      this.data[i].slots = slots
    }
  }

  async handleWithdraw(email, jobName, provider){
    await withdrawApplication(email, jobName, provider)
  }

  handleModelUpdate(slot){
    this.router.navigateByUrl('/bookSlotChoice', {state: {slot: slot}})
  }

}
