import { Component, OnInit } from '@angular/core';
import { UserInfo } from './user-info-model';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent {
  myInfo: UserInfo | undefined;
  UserInfo: any;
  
  constructor(private userInfoService: UserInfoService) {

  }
 
}
