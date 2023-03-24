import { Component } from '@angular/core';
import { PartyInfo } from './party-info-model'
import { PartyInfoService } from './party-info.service';

@Component({
  selector: 'app-party-info',
  templateUrl: './party-info.component.html',
  styleUrls: ['./party-info.component.css']
})
export class PartyInfoComponent {
  myInfo: PartyInfo | undefined;
  PartyInfo: any;
  
  constructor(private partyInfoService: PartyInfoService) {

  }
  ngOnInit(): void {
    console.log("Sending a get request to the server");
    this.showPartyInfo();
  }

  showPartyInfo() {
    const currentParty = {partyname: '' };
    this.partyInfoService.getPartyInfo(currentParty.partyname).subscribe((data: PartyInfo) => {
      console.log(data);
      this.myInfo = data;
    })
  }
}
