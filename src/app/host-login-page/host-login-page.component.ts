import { Component } from '@angular/core';
import { UserInfo } from '../backend/Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { PartyInfo } from '../backend/Partyname-backend-info/party-info/party-info-model';
import { PartyInfoService } from '../backend/Partyname-backend-info/party-info/party-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent {
  
  constructor(private userInfoService: UserInfoService, private partyInfoService: PartyInfoService, private router: Router) {

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

    this.router.navigate(['/partylogistics']);
  }
  
  onUpdateUserInfo(data:UserInfo) {
    this.userInfoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated user info sent to backend");
    });
  }
}
