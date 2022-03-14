import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {addSessionStorage, getAllJobs} from '../firebase';
import {User} from '../Interfaces/User';
import {Job} from '../Interfaces/Job';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor (private router:Router) { 
    this.init();
  }

  ngOnInit(): void {
  }

  async init(){
    var email = this.router.getCurrentNavigation()?.extras.state?.['email'];
    if(email){
      addSessionStorage('userEmail', email);
    }
    console.log(await getAllJobs());
  }

}
