import { Component } from '@angular/core';
import { UserInfo } from '../Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../Username-backend-info/user-info/user-info.service';
import { PartyInfo } from '../Partyname-backend-info/party-info/party-info-model';
import { PartyInfoService } from '../Partyname-backend-info/party-info/party-info.service';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent {
  
  constructor(private userInfoService: UserInfoService, private partyInfoService: PartyInfoService) {

  }

  onCreateParty(data: any) {
    const username = data.Username;
    const partyname = data.Partyname;

    this.onUpdateUserInfo({ Username: username });
    this.onUpdatePartyInfo({ Partyname: partyname });
  }

  onUpdatePartyInfo(data:PartyInfo) {
    this.partyInfoService.modifyPartyInfo(data).subscribe(data => {
      console.log("Updated party info sent to backend");
    });
  }
  
  onUpdateUserInfo(data:UserInfo) {
    this.userInfoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated user info sent to backend");
    });
  }
}
