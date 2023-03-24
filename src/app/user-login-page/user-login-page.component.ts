import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})



export class UserLoginPageComponent {
  
  constructor(private FloatingUserinfoService: FloatingUserInfoService, private router: Router) {

  }

  floatingUser: string = '';

  onSubmit() {
    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.floatingUser };
    this.FloatingUserinfoService.addFloatingUser(floatingUserInfo);
    this.router.navigate(['/gamelist']);
  }
  
  onUpdateFloatingUserInfo(data:FloatingUserInfo) {
    this.FloatingUserinfoService.modifyFloatingUserInfo(data).subscribe(data => {
      console.log("Updated info sent to backend");
    });

   this.router.navigate(['/gamelist']);
  }

}

