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
 
}
