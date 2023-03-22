import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-entry-page',
  templateUrl: './party-entry-page.component.html',
  styleUrls: ['./party-entry-page.component.css']
})
export class PartyEntryPageComponent {
  partyCode: string = ''

  constructor(private router: Router) {

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

