import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CodeServiceService } from '../code-service.service';

@Component({
  selector: 'app-party-entry-page',
  templateUrl: './party-entry-page.component.html',
  styleUrls: ['./party-entry-page.component.css']
})
export class PartyEntryPageComponent implements OnInit, OnDestroy {
  partyCode: string = '';
  subscription: Subscription|any;

  constructor(private router: Router, private codeService: CodeServiceService) {

  }

  ngOnInit(): void {
    this.subscription = this.codeService.currentCode.subscribe(code => {
      this.partyCode = code
      console.log(this.partyCode);
    });
    
    (<HTMLInputElement>document.getElementById("partyCode")).setAttribute("value", this.partyCode)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPartyCode() {
    // set party code to value in input field 
    this.partyCode = (<HTMLInputElement>document.getElementById("partyCode")).value
    
    // TODO: Check if party code is valid
    /* validatePartyCode(this.partyCode) */

    // if party code valid, route to user login page
    this.router.navigate(['/userlogin'])

    // if not, alert user
  }
}

