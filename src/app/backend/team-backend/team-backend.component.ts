import { Component } from '@angular/core';
import { TeamInfo } from './team-info.model';
import { TeamInfoService } from './team-info.service';

@Component({
  selector: 'app-team-backend',
  templateUrl: './team-backend.component.html',
  styleUrls: ['./team-backend.component.css']
})
export class TeamBackendComponent {
  TeamInfo: TeamInfo | undefined;
  // FloatingUserInfo: any;
  
  constructor(private TeamInfoService: TeamInfoService) {

  }
 
}
