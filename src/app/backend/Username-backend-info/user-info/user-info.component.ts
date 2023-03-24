import { Component, OnInit } from '@angular/core';
import { UserInfo } from './user-info-model';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  myInfo: UserInfo | undefined;
  UserInfo: any;
  
  constructor(private userInfoService: UserInfoService) {

  }
  ngOnInit(): void {
    console.log("Sending a get request to the server");
    this.showUserInfo();
  }

  showUserInfo() {
    const currentUser = { username: '' };
    this.userInfoService.getUserInfo(currentUser.username).subscribe((data: UserInfo) => {
      console.log(data);
      this.myInfo = data;
    })
  }
}
