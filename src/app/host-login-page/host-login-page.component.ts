import { Component } from '@angular/core';
import { UserInfo } from '../backend/Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { PartyInfo } from '../backend/Partyname-backend-info/party-info/party-info-model';
import { PartyInfoService } from '../backend/Partyname-backend-info/party-info/party-info.service';
import { Router } from '@angular/router';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent {
  
  constructor(private userInfoService: UserInfoService, private partyInfoService: PartyInfoService, private codeInfoService: CodeInfoService, private router: Router) {

  }

  onCreateParty(data: any) {
    const username = data.Username;
    const partyname = data.Partyname;
    const partycode = data.Partycode;

    this.onUpdateUserInfo({ Username: username });
    this.onUpdateCodeInfo({ Partycode: partycode});
    this.onUpdatePartyInfo(partyname, username, partycode);
  }

   PartyName: string = '';
   Host: string = '';
   PartyCode: string = '';

  onSubmit() {
    const PartyNameInfo: PartyInfo = { Host: this.Host, PartyCode: this.PartyCode, PartyName: this.PartyName };
    this.partyInfoService.addHost(PartyNameInfo);
    this.partyInfoService.addPartyName(PartyNameInfo);
    this.partyInfoService.addPartyCode(PartyNameInfo);
    this.router.navigate(['/gamelist']);
  }

  onUpdatePartyInfo(partyname: string, host: string, partycode: string) {
    const data: PartyInfo = {
      PartyName: partyname,
      Host: host,
      PartyCode: partycode
    };
    this.partyInfoService.modifyPartyInfo(partyname, host, partycode).subscribe(data => {
      console.log("Updated party info sent to backend");
    });

    this.router.navigate(['/partylogistics']);
  }
  
  onUpdateUserInfo(data:UserInfo) {
    this.userInfoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated user info sent to backend");
    });
  }

  onUpdateCodeInfo(data:CodeInfo) {
    this.codeInfoService.modifyCodeInfo(data).subscribe(data => {
      console.log("Updated user info sent to backend");
    });
  }

}
