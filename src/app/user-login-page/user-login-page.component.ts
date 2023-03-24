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

  /**
   * allows entered usernames to be stored as floating users for a party
   */
  onSubmit() {
    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.floatingUser };
    // calls addFloatinUser method to store user name in database
    this.FloatingUserinfoService.addFloatingUser(floatingUserInfo);
    this.router.navigate(['/gamelist']);
  }

}

