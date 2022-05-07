import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { getSessionStorage, updateDocSlot } from '../firebase';

@Component({
  selector: 'app-bookslot-choice',
  templateUrl: './bookslot-choice.component.html',
  styleUrls: ['./bookslot-choice.component.css']
})
export class BookslotChoiceComponent implements OnInit {
  slot: any
  user: any
  constructor(private router:Router) {
    this.slot = this.router.getCurrentNavigation()?.extras.state?.['slot'];
    this.user = getSessionStorage("userEmail");
   }

  ngOnInit(): void {
  }

  async handleSubmitSlots(form: NgForm){
    var value = form.controls['choiceRadios'].value;
    var tempArr = value.split("+");
    const date  = tempArr[0];
    const time = tempArr[1];
    updateDocSlot(date, time, this.slot.name, this.slot.provider, this.user);
  }

}
