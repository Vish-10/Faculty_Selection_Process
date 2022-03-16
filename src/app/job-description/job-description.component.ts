import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Job} from '../Interfaces/Job' 
import { getSessionStorage, uploadFileHelper } from '../firebase';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {

  job: Job
  email: boolean
  userEmail : string
  keys: string
  file: File
  constructor(private router:Router){ 
    this.job = this.router.getCurrentNavigation()?.extras.state?.['jobdetails'];
    this.userEmail = getSessionStorage('userEmail') 
    this.keys = Object.keys(this.userEmail)[0];
    this.file = null;

    if(this.keys == 'false'){
      this.email = false;
    }
    else{
      this.email = true
    }
  }

  ngOnInit(): void {}

  onChange(event){
    this.file = event.target.files[0];
  }

  onUpload(){
    console.log(this.file);
    uploadFileHelper(this.file, this.job.name, this.userEmail)
  }
}
