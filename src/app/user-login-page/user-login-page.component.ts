import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../backend/Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})



export class UserLoginPageComponent {
  
  constructor(private infoService: UserInfoService, private router: Router) {

  }

  onUpdateUserInfo(data:UserInfo) {
    this.infoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated info sent to backend");
    });

    this.router.navigate(['/playerparty']);
  }
}
