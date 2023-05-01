import { Component } from '@angular/core';
import { PartyInfo } from './party-info-model'
import { PartyInfoService } from './party-info.service';

@Component({
  selector: 'app-party-info',
  templateUrl: './party-info.component.html'
})
export class PartyInfoComponent {
  myInfo: PartyInfo | undefined;
  PartyInfo: any;
  
  constructor(private partyInfoService: PartyInfoService) {
    
  }
  
}
