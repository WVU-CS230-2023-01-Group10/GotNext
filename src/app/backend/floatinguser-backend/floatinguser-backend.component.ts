import { Component } from '@angular/core';
import { FloatingUserInfo } from './floatinguser-info.model';
import { FloatingUserInfoService } from './floatinguser-info.service';

@Component({
  selector: 'app-floatinguser-backend',
  templateUrl: './floatinguser-backend.component.html',
  styleUrls: ['./floatinguser-backend.component.css']
})
export class FloatinguserBackendComponent {
  myInfo: FloatingUserInfo | undefined;
  FloatingUserInfo: any;
  
  constructor(private floatinguserInfoService: FloatingUserInfoService) {

  }
  ngOnInit(): void {
    console.log("Sending a get request to the server");
    this.showFloatingUserInfo();
  }

  showFloatingUserInfo() {
    const FloatingUser = { FloatingUser: '' };
    this.floatinguserInfoService.getFloatingUserInfo(FloatingUser.FloatingUser).subscribe((data: FloatingUserInfo) => {
      console.log(data);
      this.myInfo = data;
    })
  }
}
