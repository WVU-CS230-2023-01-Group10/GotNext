import { Component } from '@angular/core';
import { UserInfo } from '../Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../Username-backend-info/user-info/user-info.service';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent {
  
  constructor(private infoService: UserInfoService) {

  }

  onUpdateUserInfo(data:UserInfo) {
    this.infoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated info sent to backend");
    });
  }
}
