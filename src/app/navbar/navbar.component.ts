import { Component } from '@angular/core';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(private floatingUserInfoService: FloatingUserInfoService) {

}

    name = this.floatingUserInfoService.FloatingUser;
}
