import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})



export class UserLoginPageComponent {
  
  constructor(private FloatingUserinfoService: FloatingUserInfoService, private PartyCodeInfoService: CodeInfoService, private router: Router) {

  }

  floatingUser: string = '';

  /**
   * allows entered usernames to be stored as floating users for a party
   */
  onSubmit() {
    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.floatingUser };
    const partyCodeInfo: CodeInfo = { Partycode: this.PartyCodeInfoService.code };
    // calls addFloatinUser and addAllUser methods to store username in database nodes
    this.FloatingUserinfoService.addFloatingUser(partyCodeInfo, floatingUserInfo);
    this.FloatingUserinfoService.addAllUser(floatingUserInfo);
    this.router.navigate(['/gamelist']);
  }

}

