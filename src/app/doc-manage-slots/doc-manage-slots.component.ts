import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllSlots, addSlot} from '../firebase';

@Component({
  selector: 'app-doc-manage-slots',
  templateUrl: './doc-manage-slots.component.html',
  styleUrls: ['./doc-manage-slots.component.css']
})
export class DocManageSlotsComponent{

  jobName: string
  provider: string
  date: any
  time: any
  seats: number
  slots: any

  constructor(private router:Router) { 
    this.jobName = this.router.getCurrentNavigation()?.extras.state?.['role'];
    this.provider = this.router.getCurrentNavigation()?.extras.state?.['provider'];
    this.init()
  }

  async init(){
    this.slots = await getAllSlots(this.provider, this.jobName);
  }

  async handleSlots(){
    await addSlot(this.provider, this.jobName, this.date, this.time, this.seats);
    this.date = '';
    this.time = '';
    this.seats = 0;
    this.slots = await getAllSlots(this.provider, this.jobName);
  }
}
