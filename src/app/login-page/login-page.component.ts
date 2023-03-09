import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../Username-backend-info/user-info/user-info.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})



export class LoginPageComponent {
  
  constructor(private infoService: UserInfoService, private router: Router) {

  }

  onUpdateUserInfo(data:UserInfo) {
    this.infoService.modifyUserInfo(data).subscribe(data => {
      console.log("Updated info sent to backend");
    });

    this.router.navigate(['/playerparty']);
  }
}
