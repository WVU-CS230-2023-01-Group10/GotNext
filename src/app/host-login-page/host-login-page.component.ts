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

   PartyName: string = '';
   Host: string = '';
   PartyCode: string = '';

  /**
   * allows Party information to be stored through input forms
   */
  onSubmit() {
    const PartyNameInfo: PartyInfo = { Host: this.Host, PartyCode: this.PartyCode, PartyName: this.PartyName };
    // calls addParty to add party info to database
    this.partyInfoService.addParty(PartyNameInfo);
    this.router.navigate(['/partylogistics']);
  }

}
